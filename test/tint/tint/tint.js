var fs = require("fs");
var TinyColor = require("tinycolor2");
var PNG = require("pngjs").PNG;
var JPEG = require("jpeg-js");
var MIME = require("mime");
var Path = require("path");
var FileType = require("file-type");
var StreamToBuffer = require("stream-to-buffer");
var MkDirP = require("mkdirp");
var EventEmitter = require('events');


function tint() { 
    if ("number" == typeof arguments[0] && "number" == typeof arguments[1]) {
        // create a new image
        var w = arguments[0];
        var h = arguments[1];
        var cb = arguments[2];

        if ("number" == typeof arguments[2]) {
            this._background = arguments[2];
            var cb = arguments[3];
        }

        if ("undefined" == typeof cb) cb = noop;
        if ("function" != typeof cb)
            return throwError.call(this, "cb must be a function", cb);

        this.bitmap = {
            data: new Buffer(w * h * 4),
            width: w,
            height: h
        };

        for (var i = 0; i < this.bitmap.data.length; i=i+4) {
            this.bitmap.data.writeUInt32BE(this._background, i);
        }

        cb.call(this, null, this);
    } else if ("string" == typeof arguments[0]){
            var path = arguments[0]
            var that = this;
            var cb = arguments[1];
            if(cb === undefined){
                cb = noop;
            }
            fs.readFile(path,function(err,data){
                if(err) console.error(err);
                parseBitmap.call(that, data, path ,cb);
            });      
        }     
}
 
tint.read = function(src, cb) {
    var promise = new Promise(
        function(resolve, reject) {
            cb = cb || function(err, image) {
                if (err) reject(err);
                else resolve(image);
            }
            if ("string" != typeof src && ("object" != typeof src || !Buffer.isBuffer(src)))
                return throwError.call(this, "src must be a string or a Buffer", cb);
            var img = new tint(src, cb);
        }
    );
    return promise;
}


function parseBitmap (data, path, cb) {
    var that = this;
    var mime = getMIMEFromBuffer(data, path);
    if (typeof mime !== "string")
        return cb(Error("Could not find MIME for Buffer <" + path + ">"));

    this._originalMime = mime.toLowerCase();
    let switchdata = this._originalMime || tint.MIME_PNG;
    switch (switchdata) {
        case tint.MIME_PNG:
            var png = new PNG();
            png.parse(data, function (err, data) {
                if (err) return throwError.call(that, err, cb);
                that.bitmap = {
                    data: new Buffer(data.data),
                    width: data.width,
                    height: data.height
                };
                return cb.call(that, null, that);
            });
            break;

        case tint.MIME_JPEG:
            try {
                this.bitmap = JPEG.decode(data);
                return cb.call(this, null, this);
            } catch (err) {
                console.error(err);
                return cb.call(this, err, this);
            }

        default:
            return throwError.call(this, "Unsupported MIME type: " + mime, cb);
    }
    
}

function getMIMEFromBuffer (buffer, path) {
    var fileTypeFromBuffer = FileType(buffer);
    if (fileTypeFromBuffer) {
        // If FileType returns something for buffer, then return the mime given
        return fileTypeFromBuffer.mime;
    } else if (path) {
        // If a path is supplied, and FileType yields no results, then retry with MIME
        // Path can be either a file path or a url
        return MIME.lookup(path)
    } else {
        return null;
    }
}
tint.prototype.emitMulti = function emitMulti (methodName, eventName, data={}) {
    data = Object.assign(data, {methodName, eventName});
    this.emit("any", data);
    if (methodName) this.emit(methodName, data);
    this.emit(eventName, data);
};

tint.prototype.emitError = function emitError (methodName, err) {
    this.emitMulti(methodName, "error", err);
};

tint.prototype.scan = function (x, y, w, h, f, cb) {
    if ("number" != typeof x || "number" != typeof y)
        return throwError.call(this, "x and y must be numbers", cb);
    if ("number" != typeof w || "number" != typeof h)
        return throwError.call(this, "w and h must be numbers", cb);
    if ("function" != typeof f)
        return throwError.call(this, "f must be a function", cb);

    // round input
    x = Math.round(x);
    y = Math.round(y);
    w = Math.round(w);
    h = Math.round(h);

    for (var _y = y; _y < (y + h); _y++) {
        for (var _x = x; _x < (x + w); _x++) {
            var idx = (this.bitmap.width * _y + _x) << 2;
            f.call(this, _x, _y, idx);
        }
    }

    if (isNodePattern(cb)) return cb.call(this, null, this);
    else return this;
};

tint.prototype.color = function(color,opacity,cb){
    var originalScope = this;
    this.scan(0, 0, this.bitmap.width, this.bitmap.height, function (x, y, idx){
        var clr = TinyColor({r: this.bitmap.data[idx], g: this.bitmap.data[idx + 1], b: this.bitmap.data[idx + 2]});
        clr = TinyColor.mix(clr, color, opacity);
        clr = clr.toRgb();
        this.bitmap.data[idx]   = clr.r;
        this.bitmap.data[idx+1] = clr.g;
        this.bitmap.data[idx+2] = clr.b;
    });
    if (isNodePattern(cb)) return cb.call(this, null, this);
    else return this;
};

tint.prototype.write = function (path, cb) {
    if (!fs || !fs.createWriteStream) {
        throw Error('Cant access the filesystem. You can use the getBase64 method.');
    }
    if (typeof path !== "string")
        return throwError.call(this, "path must be a string", cb);
    if (typeof cb === "undefined") cb = function () {};
    if (typeof cb !== "function")
        return throwError.call(this, "cb must be a function", cb);

    var that = this;
    var mime = MIME.lookup(path);

    var pathObj = Path.parse(path);
    if (pathObj.dir) MkDirP.sync(pathObj.dir);

    this.getBuffer(mime, function (err, buffer) {
        if (err) return throwError.call(that, err, cb);
        var stream = fs.createWriteStream(path);
        stream.on("open", function () {
            stream.write(buffer);
            stream.end();
        }).on("error", function (err) {
            return throwError.call(that, err, cb);
        });
        stream.on("finish", function () {
            return cb.call(that, null, that);
        });
    });

    return this;
};

tint.prototype.getBuffer = function (mime, cb) {
    if (mime === tint.AUTO) { // allow auto MIME detection
        mime = this._originalMime || tint.MIME_PNG;
    }
    if (typeof mime !== "string")
        return throwError.call(this, "mime must be a string", cb);
    if (typeof cb !== "function")
        return throwError.call(this, "cb must be a function", cb);

    switch (mime.toLowerCase()) {
        case tint.MIME_PNG:
            var that = this;
            var png = new PNG({
                width: this.bitmap.width,
                height: this.bitmap.height,
                bitDepth: 8,
                deflateLevel: this._deflateLevel,
                deflateStrategy: this._deflateStrategy,
                filterType: this._filterType,
                colorType: (this._rgba) ? 6 : 2,
                inputHasAlpha: true
            });

            if (this._rgba) png.data = new Buffer(this.bitmap.data);
            else png.data = compositeBitmapOverBackground(this).data; // when PNG doesn't support alpha

            StreamToBuffer(png.pack(), function (err, buffer) {
                if (err) return throwError.call(this, err, cb);
                return cb.call(that, null, buffer);
            });
            break;

        case tint.MIME_JPEG:
            // composite onto a new image so that the background shows through alpha channels
            var jpeg = JPEG.encode(compositeBitmapOverBackground(this), this._quality);
            return cb.call(this, null, jpeg.data);

        default:
            return cb.call(this, "Unsupported MIME type: " + mime);
    }

    return this;
};

tint.MIME_PNG = "image/png";
tint.MIME_JPEG = "image/jpeg";
tint.AUTO = -1;
tint.PNG_FILTER_AUTO = -1;
tint.EDGE_EXTEND = 1;
tint.EDGE_WRAP = 2;
tint.EDGE_CROP = 3;
tint.prototype.bitmap = {
    data: null,
    width: null,
    height: null
};
tint.limit255 = function(n) {
    n = Math.max(n, 0);
    n = Math.min(n, 255);
    return n;
}

tint.prototype._quality = 100;
tint.prototype._deflateLevel = 9;
tint.prototype._exif = null;
tint.prototype._deflateStrategy = 3;
tint.prototype._filterType = tint.PNG_FILTER_AUTO;
tint.prototype._rgba = true;
tint.prototype._background = 0x00000000;

function throwError (error, cb) {
    if (typeof error === "string") error = new Error(error);
    if (typeof cb === "function") return cb.call(this, error);
    else throw error;
}

function compositeBitmapOverBackground(image){
    return (new tint(image.bitmap.width, image.bitmap.height, image._background)).composite(image, 0, 0).bitmap;
}

tint.prototype.composite = function (src, x, y, cb) {
    if (!(src instanceof tint))
        return throwError.call(this, "The source must be a object", cb);
    if ("number" != typeof x || "number" != typeof y)
        return throwError.call(this, "x and y must be numbers", cb);

    // round input
    x = Math.round(x);
    y = Math.round(y);

    var that = this;
    src.scan(0, 0, src.bitmap.width, src.bitmap.height, function(sx, sy, idx) {
        var dstIdx = that.getPixelIndex(x+sx, y+sy);

        var fg = {
            r: this.bitmap.data[idx + 0] / 255,
            g: this.bitmap.data[idx + 1] / 255,
            b: this.bitmap.data[idx + 2] / 255,
            a: this.bitmap.data[idx + 3] / 255
        }
        var bg = {
            r: that.bitmap.data[dstIdx + 0] / 255,
            g: that.bitmap.data[dstIdx + 1] / 255,
            b: that.bitmap.data[dstIdx + 2] / 255,
            a: that.bitmap.data[dstIdx + 3] / 255
        }

        var a = bg.a + fg.a - bg.a * fg.a;

        var r = ((fg.r * fg.a) + (bg.r * bg.a) * (1 - fg.a)) / a;
        var g = ((fg.g * fg.a) + (bg.g * bg.a) * (1 - fg.a)) / a;
        var b = ((fg.b * fg.a) + (bg.b * bg.a) * (1 - fg.a)) / a;

        that.bitmap.data[dstIdx + 0] = tint.limit255(r * 255);
        that.bitmap.data[dstIdx + 1] = tint.limit255(g * 255);
        that.bitmap.data[dstIdx + 2] = tint.limit255(b * 255);
        that.bitmap.data[dstIdx + 3] = tint.limit255(a * 255);
    });

    if (isNodePattern(cb)) return cb.call(this, null, this);
    else return this;
};

tint.prototype.getPixelIndex = function (x, y, edgeHandling, cb) {
    var xi, yi;
    if ("function" == typeof edgeHandling && "undefined" == typeof cb) {
        cb = edgeHandling;
        edgeHandling = null;
    }
    if (!edgeHandling) edgeHandling = tint.EDGE_EXTEND;
    if ("number" != typeof x || "number" != typeof y)
        return throwError.call(this, "x and y must be numbers", cb);

    // round input
    xi = x = Math.round(x);
    yi = y = Math.round(y);

    if (edgeHandling == tint.EDGE_EXTEND) {
        if (x<0) xi = 0;
        if (x>=this.bitmap.width) xi = this.bitmap.width - 1;
        if (y<0) yi = 0;
        if (y>=this.bitmap.height) yi = this.bitmap.height - 1;
    }

    if (edgeHandling == tint.EDGE_WRAP) {
        if (x<0) xi = this.bitmap.width + x;
        if (x>=this.bitmap.width) xi = x % this.bitmap.width;
        if (y<0) xi = this.bitmap.height + y;
        if (y>=this.bitmap.height) yi = y % this.bitmap.height;
    }

    var i = (this.bitmap.width * yi + xi) << 2;

    // if out of bounds index is -1
    if (xi < 0 || xi >= this.bitmap.width) i = -1;
    if (yi < 0 || yi >= this.bitmap.height) i = -1;

    if (isNodePattern(cb)) return cb.call(this, null, i);
    else return i;
};

function isNodePattern (cb) {
    if (typeof cb === "undefined") return false;
    if (typeof cb !== "function")
        throw new Error("Callback must be a function");
    return true;
}
function noop() {}
 
module.exports = tint;