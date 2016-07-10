/**
 * Created by Sam Washington on 8/14/2015.
 *
 * Adapted from dropzone.js at [www.dropzonejs.com] made in 2012 by Matias Meno
 * -- Wanted to make more consistent with the rest of the tool, gain some insight, modify some functionality
 *
 */

define(['sm_util', 'Emitter'], function (u, Emitter) {
    var __arr_slice = Array.prototype.slice;
    var no_op       = function () {};
    var extend      = function () {
        var key, object, objects, target, val, _i, _len;
        target = arguments[0], objects = 2 <= arguments.length ? __arr_slice.call(arguments, 1) : [];
        for (_i = 0, _len = objects.length; _i < _len; _i++) {
            object = objects[_i];
            for (key in object) {
                if (!object.hasOwnProperty(key))continue;
                val         = object[key];
                target[key] = val;
            }
        }
        return target;
    };

    var without       = function (list, rejectedItem) {
        var item, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = list.length; _i < _len; _i++) {
            item = list[_i];
            if (item !== rejectedItem) {
                _results.push(item);
            }
        }
        return _results;
    };
    var resolveOption = function () {
        var args, option;
        option = arguments[0], args = 2 <= arguments.length ? __arr_slice.call(arguments, 1) : [];
        if (typeof option === 'function') {
            return option.apply(this, args);
        }
        return option;
    };
    /*
     Bugfix for iOS 6 and 7
     Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
     based on the work of https://github.com/stomita/ios-imagefile-megapixel
     */
    var detectVerticalSquash = function (img) {
        var alpha, canvas, ctx, data, ey, ih, iw, py, ratio, sy;
        iw            = img.naturalWidth;
        ih            = img.naturalHeight;
        canvas        = document.createElement("canvas");
        canvas.width  = 1;
        canvas.height = ih;
        ctx           = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        data          = ctx.getImageData(0, 0, 1, ih).data;
        sy            = 0;
        ey            = ih;
        py            = ih;
        while (py > sy) {
            alpha = data[(py - 1) * 4 + 3];
            if (alpha === 0) {
                ey = py;
            } else {
                sy = py;
            }
            py = (ey + sy) >> 1;
        }
        ratio = py / ih;
        if (ratio === 0) {
            return 1;
        } else {
            return ratio;
        }
    };
    var drawImageIOSFix      = function (ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
        var vertSquashRatio;
        vertSquashRatio = detectVerticalSquash(img);
        return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
    };

    var _default_options = {
        url:                          null,
        method:                       "post",
        withCredentials:              false,
        parallelUploads:              2,
        uploadMultiple:               false,
        maxFilesize:                  256,
        paramName:                    "file",
        createImageThumbnails:        true,
        maxThumbnailFilesize:         10,
        thumbnailWidth:               120,
        thumbnailHeight:              120,
        maxFiles:                     null,
        filesizeBase:                 1000,
        params:                       {},
        clickable:                    true,
        ignoreHiddenFiles:            true,
        acceptedFiles:                null,
        autoProcessQueue:             true,
        autoQueue:                    true,
        addRemoveLinks:               false,
        previewsContainer:            null,
        capture:                      null,
        dictDefaultMessage:           "Drop files here to upload",
        dictFallbackMessage:          "Your browser does not support drag'n'drop file uploads.",
        dictFallbackText:             "Please use the fallback form below to upload your files like in the olden days.",
        dictFileTooBig:               "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
        dictInvalidFileType:          "You can't upload files of this type.",
        dictResponseError:            "Server responded with {{statusCode}} code.",
        dictCancelUpload:             "Cancel upload",
        dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
        dictRemoveFile:               "Remove file",
        dictRemoveFileConfirmation:   null,
        dictMaxFilesExceeded:         "You can not upload any more files.",
        accept:                       function (file, done) {
            return done();
        },
        init:                         function () {
            return no_op;
        },
        forceFallback:                false,
        fallback:                     function () {
            var child, messageElement, span;
            this.element.className = "" + this.element.className + " sm-browser-not-supported";
            var divs               = this.element.getElementsByTagName("div");
            for (var i = 0, div_len = divs.length; i < div_len; i++) {
                child = divs[i];
                if (/(^| )sm-message($| )/.test(child.className)) {
                    messageElement  = child;
                    child.className = "sm-message";
                }
            }
            if (!messageElement) {
                messageElement = Filedrop.createElement("<div class=\"sm-message\"><span></span></div>");
                this.element.appendChild(messageElement);
            }
            span = messageElement.getElementsByTagName("span")[0];
            if (span) {
                span.textContent = this.options.dictFallbackMessage;
            }
            return this.element.appendChild(this.getFallbackForm());
        },
        resize:                       function (file) {
            var info, srcRatio, trgRatio;
            info           = {
                srcX:      0,
                srcY:      0,
                srcWidth:  file.width,
                srcHeight: file.height
            };
            srcRatio       = file.width / file.height;
            info.optWidth  = this.options.thumbnailWidth;
            info.optHeight = this.options.thumbnailHeight;
            if ((info.optWidth == null) && (info.optHeight == null)) {
                info.optWidth  = info.srcWidth;
                info.optHeight = info.srcHeight;
            } else if (info.optWidth == null) {
                info.optWidth = srcRatio * info.optHeight;
            } else if (info.optHeight == null) {
                info.optHeight = (1 / srcRatio) * info.optWidth;
            }
            trgRatio = info.optWidth / info.optHeight;
            if (file.height < info.optHeight || file.width < info.optWidth) {
                info.trgHeight = info.srcHeight;
                info.trgWidth  = info.srcWidth;
            } else {
                if (srcRatio > trgRatio) {
                    info.srcHeight = file.height;
                    info.srcWidth  = info.srcHeight * trgRatio;
                } else {
                    info.srcWidth  = file.width;
                    info.srcHeight = info.srcWidth / trgRatio;
                }
            }
            info.srcX = (file.width - info.srcWidth) / 2;
            info.srcY = (file.height - info.srcHeight) / 2;
            return info;
        },
        /*
         Those functions register themselves to the events on init and handle all
         the user interface specific stuff. Overwriting them won't break the upload
         but can break the way it's displayed.
         You can overwrite them if you don't like the default behavior. If you just
         want to add an additional event handler, register it on the filedrop object
         and don't overwrite those options.
         */
        drop:                         function (e) {
            return this.element.classList.remove("sm-drag-hover");
        },
        click:                        function () {},
        dragstart:                    function () {},
        dragend:                      function (e) {
            return this.element.classList.remove("sm-drag-hover");
        },
        dragenter:                    function (e) {
            return this.element.classList.add("sm-drag-hover");
        },
        dragover:                     function (e) {
            return this.element.classList.add("sm-drag-hover");
        },
        dragleave:                    function (e) {
            return this.element.classList.remove("sm-drag-hover");
        },
        paste:                        no_op,
        reset:                        function () {
            return this.element.classList.remove("sm-started");
        },
        addedfile:                    function (file) {
            var node, removeFileEvent, removeLink, _i, _j, _k, _len, _len1, _len2, data_remove_query, _results;
            if (this.element === this.previewsContainer) {
                this.element.classList.add("sm-started");
            }
            if (this.previewsContainer) {
                file.previewElement  = Filedrop.createElement(this.options.previewTemplate.trim());
                file.previewTemplate = file.previewElement;
                this.previewsContainer.appendChild(file.previewElement);
                var data_name_query  = file.previewElement.querySelectorAll("[data-sm-name]");
                for (_i = 0, _len = data_name_query.length; _i < _len; _i++) {
                    node             = data_name_query[_i];
                    node.textContent = file.name;
                }
                var data_size_query = file.previewElement.querySelectorAll("[data-sm-size]");
                for (_j = 0, _len1 = data_size_query.length; _j < _len1; _j++) {
                    node           = data_size_query[_j];
                    node.innerHTML = this.filesize(file.size);
                }
                if (this.options.addRemoveLinks) {
                    file._removeLink = Filedrop.createElement("<a class=\"sm-remove\" href=\"javascript:undefined;\" data-sm-remove>" + this.options.dictRemoveFile + "</a>");
                    file.previewElement.appendChild(file._removeLink);
                }
                removeFileEvent   = (function (_this) {
                    return function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (file.status === Filedrop.UPLOADING) {
                            return Filedrop.confirm(_this.options.dictCancelUploadConfirmation, function () {
                                return _this.removeFile(file);
                            });
                        } else {
                            if (_this.options.dictRemoveFileConfirmation) {
                                return Filedrop.confirm(_this.options.dictRemoveFileConfirmation, function () {
                                    return _this.removeFile(file);
                                });
                            } else {
                                return _this.removeFile(file);
                            }
                        }
                    };
                })(this);
                data_remove_query = file.previewElement.querySelectorAll("[data-sm-remove]");
                _results          = [];
                for (_k = 0, _len2 = data_remove_query.length; _k < _len2; _k++) {
                    removeLink = data_remove_query[_k];
                    _results.push(removeLink.addEventListener("click", removeFileEvent));
                }
                return _results;
            }
        },
        removedfile:                  function (file) {
            var preview_el;
            if (file.previewElement) {
                if ((preview_el = file.previewElement) != null) {
                    preview_el.parentNode.removeChild(file.previewElement);
                }
            }
            return this._updateMaxFilesReachedClass();
        },
        thumbnail:                    function (file, dataUrl) {
            var thumbnailElement, _i, _len;
            if (file.previewElement) {
                file.previewElement.classList.remove("sm-file-preview");
                var data_thumbnail_el = file.previewElement.querySelectorAll("[data-sm-thumbnail]");
                for (_i = 0, _len = data_thumbnail_el.length; _i < _len; _i++) {
                    thumbnailElement     = data_thumbnail_el[_i];
                    thumbnailElement.alt = file.name;
                    thumbnailElement.src = dataUrl;
                }
                return setTimeout(((function (_this) {
                    return function () {
                        return file.previewElement.classList.add("sm-image-preview");
                    };
                })(this)), 1);
            }
        },
        error:                        function (file, message) {
            var node, _results;
            if (file.previewElement) {
                file.previewElement.classList.add("sm-error");
                if (typeof message !== "String" && message.error) {
                    message = message.error;
                }
                var data_error_msg_query = file.previewElement.querySelectorAll("[data-sm-errormessage]");
                _results                 = [];
                for (var _i = 0, _len = data_error_msg_query.length; _i < _len; _i++) {
                    node = data_error_msg_query[_i];
                    _results.push(node.textContent = message);
                }
                return _results;
            }
        },
        error_multiple:               no_op,
        processing:                   function (file) {
            if (file.previewElement) {
                file.previewElement.classList.add("sm-processing");
                if (file._removeLink) {
                    return file._removeLink.textContent = this.options.dictCancelUpload;
                }
            }
        },
        processingmultiple:           no_op,
        uploadprogress:               function (file, progress, bytesSent) {
            var node, _i, _len, _results;
            if (file.previewElement) {
                var data_upload_prog_query = file.previewElement.querySelectorAll("[data-sm-uploadprogress]");
                _results                   = [];
                for (_i = 0, _len = data_upload_prog_query.length; _i < _len; _i++) {
                    node = data_upload_prog_query[_i];
                    if (node.nodeName === 'PROGRESS') {
                        _results.push(node.value = progress);
                    } else {
                        _results.push(node.style.width = "" + progress + "%");
                    }
                }
                return _results;
            }
        },
        totaluploadprogress:          no_op,
        sending:                      no_op,
        sending_multiple:             no_op,
        success:                      function (file) {
            if (file.previewElement) {
                return file.previewElement.classList.add("sm-success");
            }
        },
        success_multiple:             no_op,
        canceled:                     function (file) {
            return this.emit("error", file, "Upload canceled.");
        },
        canceled_multiple:            no_op,
        complete:                     function (file) {
            if (file._removeLink) {
                file._removeLink.textContent = this.options.dictRemoveFile;
            }
            if (file.previewElement) {
                return file.previewElement.classList.add("sm-complete");
            }
        },
        completemultiple:             no_op,
        maxfilesexceeded:             no_op,
        maxfilesreached:              no_op,
        queue_complete:               no_op,
        previewTemplate:              "<div class=\"sm-preview sm-file-preview\">\n  <div class=\"sm-image\"><img data-sm-thumbnail /></div>\n  <div class=\"sm-details\">\n    <div class=\"sm-size\"><span data-sm-size></span></div>\n    <div class=\"sm-filename\"><span data-sm-name></span></div>\n  </div>\n  <div class=\"sm-progress\"><span class=\"sm-upload\" data-sm-uploadprogress></span></div>\n  <div class=\"sm-error-message\"><span data-sm-errormessage></span></div>\n  <div class=\"sm-success-mark\">\n    Y\n  </div>\n  <div class=\"sm-error-mark\">\n    X\n  </div>\n</div>"
    };


    var Filedrop = Emitter.extend({
        Emitter:              Emitter,
        events:               [
            "click", "drop", "dragstart", "dragend", "dragenter",
            "dragover", "dragleave", "addedfile", "removedfile",
            "thumbnail", "error", "error_multiple", "processing",
            "processingmultiple", "uploadprogress", "totaluploadprogress", "sending",
            "sending_multiple", "success", "successmultiple", "canceled",
            "canceled_multiple", "complete", "completemultiple", "reset",
            "maxfilesexceeded", "maxfilesreached", "queue_complete"
        ],
        options:              {},
        _thumbnailQueue:      [],
        _processingThumbnail: false,
        init:                 function (element, options) {
            if (typeof element === "string") {
                element = document.querySelector(element);
            }
            if (!(element && (element.nodeType != null))) {
                throw new Error("Invalid element");
            }
            if (element.filedrop) {
                throw new Error("Filedrop already initialized")
            }
            element.filedrop                 = this;
            this.element                     = element;
            this.clickableElements           = [];
            this.listeners                   = [];
            this.files                       = [];
            this._callbacks                  = {};
            Filedrop.instances.push(this);
            _default_options.previewTemplate = _default_options.previewTemplate.replace(/\n*/g, "");

            var ele_option_ref;
            options      = !!options && typeof  options === 'object' ? options : {};
            this.options = extend({}, _default_options, options);

            if (this.options.forceFallback || !Filedrop.isBrowserSupported()) {
                return this.options.fallback.call(this);
            }

            if (this.options.url == null) {
                this.options.url = this.element.getAttribute("action");
            }
            if (!this.options.url) {
                throw new Error("No URL provided.");
            }
            this.options.method = this.options.method.toUpperCase();

            var fallback = this.getExistingFallback();
            if (fallback && fallback.parentNode) {
                fallback.parentNode.removeChild(fallback);
            }

            if (this.options.previewsContainer !== false) {
                if (this.options.previewsContainer) {
                    this.previewsContainer = Filedrop.getElement(this.options.previewsContainer, "previewsContainer");
                } else {
                    this.previewsContainer = this.element;
                }
            }
            if (this.options.clickable) {
                if (this.options.clickable === true) {
                    this.clickableElements = [this.element];
                } else {
                    this.clickableElements = Filedrop.getElements(this.options.clickable, "clickable");
                }
            }
            this.initialize();
        },
        initialize:           function () {
            var eventName, _i, _len, window_url_ref;
            if (this.element.tagName === "form") {
                this.element.setAttribute("enctype", "multipart/form-data");
            }
            if (this.element.classList.contains("filedrop") && !this.element.querySelector(".sm-message")) {
                this.element.appendChild(Filedrop.createElement("<div class=\"sm-default sm-message\"><span>" + this.options.dictDefaultMessage + "</span></div>"));
            }
            if (this.clickableElements.length) {
                var setupHiddenFileInput = (function (_this) {
                    return function () {
                        if (_this.hiddenFileInput) {
                            document.body.removeChild(_this.hiddenFileInput);
                        }
                        _this.hiddenFileInput = document.createElement("input");
                        _this.hiddenFileInput.setAttribute("type", "file");
                        if ((_this.options.maxFiles == null) || _this.options.maxFiles > 1) {
                            _this.hiddenFileInput.setAttribute("multiple", "multiple");
                        }
                        _this.hiddenFileInput.className = "sm-hidden-input";
                        if (_this.options.acceptedFiles != null) {
                            _this.hiddenFileInput.setAttribute("accept", _this.options.acceptedFiles);
                        }
                        if (_this.options.capture != null) {
                            _this.hiddenFileInput.setAttribute("capture", _this.options.capture);
                        }
                        _this.hiddenFileInput.style.visibility = "hidden";
                        _this.hiddenFileInput.style.position   = "absolute";
                        _this.hiddenFileInput.style.top        = "0";
                        _this.hiddenFileInput.style.left       = "0";
                        _this.hiddenFileInput.style.height     = "0";
                        _this.hiddenFileInput.style.width      = "0";
                        document.body.appendChild(_this.hiddenFileInput);
                        return _this.hiddenFileInput.addEventListener("change", function () {
                            var file, files, _i, _len;
                            files = _this.hiddenFileInput.files;
                            if (files.length) {
                                for (_i = 0, _len = files.length; _i < _len; _i++) {
                                    file = files[_i];
                                    _this.addFile(file);
                                }
                            }
                            return setupHiddenFileInput();
                        });
                    };
                })(this);
                setupHiddenFileInput();
            }
            this.URL = (window_url_ref = window.URL) != null ? window_url_ref : window.webkitURL;

            var events = this.events;
            for (_i = 0, _len = events.length; _i < _len; _i++) {
                eventName = events[_i];
                this.on(eventName, this.options[eventName]);
            }
            this.on("uploadprogress", (function (_this) {
                return function () {
                    return _this.updateTotalUploadProgress();
                };
            })(this));
            this.on("removedfile", (function (_this) {
                return function () {
                    return _this.updateTotalUploadProgress();
                };
            })(this));
            this.on("canceled", (function (_this) {
                return function (file) {
                    return _this.emit("complete", file);
                };
            })(this));
            this.on("complete", (function (_this) {
                return function (file) {
                    if (_this.getUploadingFiles().length === 0 && _this.getQueuedFiles().length === 0) {
                        return setTimeout((function () {
                            return _this.emit("queue_complete");
                        }), 0);
                    }
                };
            })(this));
            var noPropagation = function (e) {
                e.stopPropagation();
                if (e.preventDefault) {
                    return e.preventDefault();
                } else {
                    return e.returnValue = false;
                }
            };
            this.listeners    = [
                {
                    element: this.element,
                    events:  {
                        "dragstart": (function (_this) {
                            return function (e) {
                                return _this.emit("dragstart", e);
                            };
                        })(this),
                        "dragenter": (function (_this) {
                            return function (e) {
                                noPropagation(e);
                                return _this.emit("dragenter", e);
                            };
                        })(this),
                        "dragover":  (function (_this) {
                            return function (e) {
                                var effect;
                                try {
                                    effect = e.dataTransfer.effectAllowed;
                                } catch (_error) {}
                                e.dataTransfer.dropEffect = 'move' === effect || 'linkMove' === effect ? 'move' : 'copy';
                                noPropagation(e);
                                return _this.emit("dragover", e);
                            };
                        })(this),
                        "dragleave": (function (_this) {
                            return function (e) {
                                return _this.emit("dragleave", e);
                            };
                        })(this),
                        "drop":      (function (_this) {
                            return function (e) {
                                noPropagation(e);
                                return _this.drop(e);
                            };
                        })(this),
                        "dragend":   (function (_this) {
                            return function (e) {
                                return _this.emit("dragend", e);
                            };
                        })(this),
                        "click":     (function (_this) {
                            return function (e) {
                                return _this.emit("click", e);
                            };
                        })(this)
                    }
                }
            ];
            this.clickableElements.forEach((function (_this) {
                return function (clickableElement) {
                    return _this.listeners.push({
                        element: clickableElement,
                        events:  {
                            "click": function (evt) {
                                if ((clickableElement !== _this.element) || (evt.target === _this.element || Filedrop.elementInside(evt.target, _this.element.querySelector(".sm-message")))) {
                                    return _this.hiddenFileInput.click();
                                }
                            }
                        }
                    });
                };
            })(this));
            this.enable();
            return this.options.init.call(this);

        },
        destroy:              function () {
            var hidden_input;
            this.disable();
            this.removeAllFiles(true);
            if ((hidden_input = this.hiddenFileInput) != null ? hidden_input.parentNode : void 0) {
                this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
                this.hiddenFileInput = null;
            }
            delete this.element.filedrop;
            return Filedrop.instances.splice(Filedrop.instances.indexOf(this), 1);
        },

        _updateMaxFilesReachedClass: function () {
            if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
                if (this.getAcceptedFiles().length === this.options.maxFiles) {
                    this.emit('maxfilesreached', this.files);
                }
                return this.element.classList.add("sm-max-files-reached");
            } else {
                return this.element.classList.remove("sm-max-files-reached");
            }

        },
        _addFilesFromItems:          function (items) {
            var entry, item, _i, _len, _results;
            _results = [];
            for (_i = 0, _len = items.length; _i < _len; _i++) {
                item = items[_i];
                if ((item.webkitGetAsEntry != null) && (entry = item.webkitGetAsEntry())) {
                    if (entry.isFile) {
                        _results.push(this.addFile(item.getAsFile()));
                    } else if (entry.isDirectory) {
                        _results.push(this._addFilesFromDirectory(entry, entry.name));
                    } else {
                        _results.push(void 0);
                    }
                } else if (item.getAsFile != null) {
                    if ((item.kind == null) || item.kind === "file") {
                        _results.push(this.addFile(item.getAsFile()));
                    } else {
                        _results.push(void 0);
                    }
                } else {
                    _results.push(void 0);
                }
            }
            return _results;
        },
        _addFilesFromDirectory:      function (directory, path) {
            var dirReader, entriesReader;
            dirReader     = directory.createReader();
            entriesReader = (function (_this) {
                return function (entries) {
                    var entry, _i, _len;
                    for (_i = 0, _len = entries.length; _i < _len; _i++) {
                        entry = entries[_i];
                        if (entry.isFile) {
                            entry.file(function (file) {
                                if (_this.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
                                    return;
                                }
                                file.fullPath = "" + path + "/" + file.name;
                                return _this.addFile(file);
                            });
                        } else if (entry.isDirectory) {
                            _this._addFilesFromDirectory(entry, "" + path + "/" + entry.name);
                        }
                    }
                };
            })(this);
            return dirReader.readEntries(entriesReader, function (error) {
                return (typeof console !== "undefined" && console !== null) ? (typeof console.log === "function" ? console.log(error) : void 0) : void 0;
            });
        },
        _enqueueThumbnail:           function (file) {
            if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1024 * 1024) {
                this._thumbnailQueue.push(file);
                return setTimeout(((function (_this) {
                    return function () {
                        return _this._processThumbnailQueue();
                    };
                })(this)), 0);
            }
        },
        _processThumbnailQueue:      function () {
            if (this._processingThumbnail || this._thumbnailQueue.length === 0) {
                return;
            }
            this._processingThumbnail = true;
            return this.createThumbnail(this._thumbnailQueue.shift(), (function (_this) {
                return function () {
                    _this._processingThumbnail = false;
                    return _this._processThumbnailQueue();
                };
            })(this));
        },
        _getFilesWithXhr:            function (xhr) {
            var file;
            return (function () {
                var _i, _len, files, _results;
                files    = this.files;
                _results = [];
                for (_i = 0, _len = files.length; _i < _len; _i++) {
                    file = files[_i];
                    if (file.xhr === xhr) {
                        _results.push(file);
                    }
                }
                return _results;
            }).call(this);
        },
        _finished:                   function (files, responseText, e) {
            var file, _i, _len;
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file        = files[_i];
                file.status = Filedrop.SUCCESS;
                this.emit("success", file, responseText, e);
                this.emit("complete", file);
            }
            if (this.options.uploadMultiple) {
                this.emit("successmultiple", files, responseText, e);
                this.emit("completemultiple", files);
            }
            if (this.options.autoProcessQueue) {
                console.log('queue');
                return this.processQueue();
            }
        },
        _errorProcessing:            function (files, message, xhr) {
            var file, _i, _len;
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file        = files[_i];
                file.status = Filedrop.ERROR;
                this.emit("error", file, message, xhr);
                this.emit("complete", file);
            }
            if (this.options.uploadMultiple) {
                this.emit("errormultiple", files, message, xhr);
                this.emit("completemultiple", files);
            }
            if (this.options.autoProcessQueue) {
                return this.processQueue();
            }
        },
        _getParamName:               function (n) {
            if (typeof this.options.paramName === "function") {
                return this.options.paramName(n);
            } else {
                return "" + this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "");
            }
        },

        enable:   function () {
            this.clickableElements.forEach(function (element) {
                return element.classList.add("sm-clickable");
            });
            return this.setupEventListeners();
        },
        disable:  function () {
            var file, _i, _len, files, _results;
            this.clickableElements.forEach(function (element) {
                return element.classList.remove("sm-clickable");
            });
            this.removeEventListeners();
            files    = this.files;
            _results = [];
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                _results.push(this.cancelUpload(file));
            }
            return _results;
        },
        drop:     function (e) {
            var files, items;
            if (!e.dataTransfer) {
                return;
            }
            this.emit("drop", e);
            files = e.dataTransfer.files;
            if (files.length) {
                items = e.dataTransfer.items;
                if (items && items.length && (items[0].webkitGetAsEntry != null)) {
                    this._addFilesFromItems(items);
                } else {
                    this.handleFiles(files);
                }
            }
        },
        paste:    function (e) {
            var items, clipboard;
            if ((e != null ? (clipboard = e.clipboardData) != null ? clipboard.items : void 0 : void 0) == null) {
                return;
            }
            this.emit("paste", e);
            items = e.clipboardData.items;
            if (items.length) {
                return this._addFilesFromItems(items);
            }
        },
        filesize: function (size) {
            var cutoff, i, selectedSize, selectedUnit, unit, units, _i, _len;
            units        = ['TB', 'GB', 'MB', 'KB', 'b'];
            selectedSize = selectedUnit = null;
            for (i = _i = 0, _len = units.length; _i < _len; i = ++_i) {
                unit   = units[i];
                cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;
                if (size >= cutoff) {
                    selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
                    selectedUnit = unit;
                    break;
                }
            }
            selectedSize = Math.round(10 * selectedSize) / 10;
            return "<strong>" + selectedSize + "</strong> " + selectedUnit;
        },

        accept:          function (file, done) {
            if (file.size > this.options.maxFilesize * 1024 * 1024) {
                return done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
            } else if (!Filedrop.isValidFile(file, this.options.acceptedFiles)) {
                return done(this.options.dictInvalidFileType);
            } else if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
                done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
                return this.emit("maxfilesexceeded", file);
            } else {
                return this.options.accept.call(this, file, done);
            }
        },
        handleFiles:     function (files) {
            var file, _i, _len, _results;
            _results = [];
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                _results.push(this.addFile(file));
            }
            return _results;
        },
        addFile:         function (file) {
            file.upload = {
                progress:  0,
                total:     file.size,
                bytesSent: 0
            };
            this.files.push(file);
            file.status = Filedrop.ADDED;
            this.emit("addedfile", file);
            this._enqueueThumbnail(file);
            return this.accept(file, (function (_this) {
                return function (error) {
                    if (error) {
                        file.accepted = false;
                        _this._errorProcessing([file], error);
                    } else {
                        file.accepted = true;
                        if (_this.options.autoQueue) {
                            _this.enqueueFile(file);
                        }
                    }
                    return _this._updateMaxFilesReachedClass();
                };
            })(this));
        },
        enqueueFile:     function (file) {
            if (file.status === Filedrop.ADDED && file.accepted === true) {
                file.status = Filedrop.QUEUED;
                if (this.options.autoProcessQueue) {
                    return setTimeout(((function (_this) {
                        return function () {
                            return _this.processQueue();
                        };
                    })(this)), 0);
                }
            } else {
                throw new Error("This file can't be queued because it has already been processed or was rejected.");
            }
        },
        removeFile:      function (file) {
            if (file.status === Filedrop.UPLOADING) {
                this.cancelUpload(file);
            }
            this.files = without(this.files, file);
            this.emit("removedfile", file);
            if (this.files.length === 0) {
                return this.emit("reset");
            }
        },
        removeAllFiles:  function (cancelIfNecessary) {
            var file, _i, _len, files;
            cancelIfNecessary = !!cancelIfNecessary;
            files             = this.files.slice();
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                if (file.status !== Filedrop.UPLOADING || cancelIfNecessary) {
                    this.removeFile(file);
                }
            }
            return null;
        },
        createThumbnail: function (file, callback) {
            var fileReader;
            fileReader        = new FileReader;
            fileReader.onload = (function (_this) {
                return function () {
                    if (file.type === "image/svg+xml") {
                        _this.emit("thumbnail", file, fileReader.result);
                        if (callback != null) {
                            callback();
                        }
                        return;
                    }
                    return _this.createThumbnailFromUrl(file, fileReader.result, callback);
                };
            })(this);
            return fileReader.readAsDataURL(file);
        },

        createThumbnailFromUrl: function (file, imageUrl, callback) {
            var img;
            img        = document.createElement("img");
            img.onload = (function (_this) {
                return function () {
                    var canvas, ctx, resizeInfo, thumbnail, rsz_x, rsz_y, rsz_t_x, rsz_t_y;
                    file.width  = img.width;
                    file.height = img.height;
                    resizeInfo  = _this.options.resize.call(_this, file);
                    if (resizeInfo.trgWidth == null) {
                        resizeInfo.trgWidth = resizeInfo.optWidth;
                    }
                    if (resizeInfo.trgHeight == null) {
                        resizeInfo.trgHeight = resizeInfo.optHeight;
                    }
                    canvas        = document.createElement("canvas");
                    ctx           = canvas.getContext("2d");
                    canvas.width  = resizeInfo.trgWidth;
                    canvas.height = resizeInfo.trgHeight;
                    drawImageIOSFix(
                        ctx,
                        img,
                        (rsz_x = resizeInfo.srcX) != null ? rsz_x : 0,
                        (rsz_y = resizeInfo.srcY) != null ? rsz_y : 0,
                        resizeInfo.srcWidth, resizeInfo.srcHeight,
                        (rsz_t_x = resizeInfo.trgX) != null ? rsz_t_x : 0,
                        (rsz_t_y = resizeInfo.trgY) != null ? rsz_t_y : 0,
                        resizeInfo.trgWidth, resizeInfo.trgHeight);

                    thumbnail = canvas.toDataURL("image/png");
                    _this.emit("thumbnail", file, thumbnail);
                    if (callback != null) {
                        return callback();
                    }
                };
            })(this);
            if (callback != null) {
                img.onerror = callback;
            }
            return img.src = imageUrl;
        },
        processQueue:           function () {
            var i, parallelUploads, processingLength, queuedFiles;
            parallelUploads  = this.options.parallelUploads;
            processingLength = this.getUploadingFiles().length;
            i                = processingLength;
            if (processingLength >= parallelUploads) {
                return;
            }
            queuedFiles = this.getQueuedFiles();
            if (!(queuedFiles.length > 0)) {
                return;
            }
            if (this.options.uploadMultiple) {
                return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
            } else {
                while (i < parallelUploads) {
                    if (!queuedFiles.length) {
                        return;
                    }
                    this.processFile(queuedFiles.shift());
                    i++;
                }
            }
        },

        processFile:  function (file) {
            return this.processFiles([file]);
        },
        processFiles: function (files) {
            var file, _i, _len;
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file            = files[_i];
                file.processing = true;
                file.status     = Filedrop.UPLOADING;
                this.emit("processing", file);
            }
            if (this.options.uploadMultiple) {
                this.emit("processingmultiple", files);
            }
            return this.uploadFiles(files);
        },
        cancelUpload: function (file) {
            var groupedFile, groupedFiles, _i, _j, _len, _len1, file_status;
            if (file.status === Filedrop.UPLOADING) {
                groupedFiles = this._getFilesWithXhr(file.xhr);
                for (_i = 0, _len = groupedFiles.length; _i < _len; _i++) {
                    groupedFile        = groupedFiles[_i];
                    groupedFile.status = Filedrop.CANCELED;
                }
                file.xhr.abort();
                for (_j = 0, _len1 = groupedFiles.length; _j < _len1; _j++) {
                    groupedFile = groupedFiles[_j];
                    this.emit("canceled", groupedFile);
                }
                if (this.options.uploadMultiple) {
                    this.emit("canceledmultiple", groupedFiles);
                }
            } else if ((file_status = file.status) === Filedrop.ADDED || file_status === Filedrop.QUEUED) {
                file.status = Filedrop.CANCELED;
                this.emit("canceled", file);
                if (this.options.uploadMultiple) {
                    this.emit("canceledmultiple", [file]);
                }
            }
            if (this.options.autoProcessQueue) {
                return this.processQueue();
            }
        },

        uploadFiles:    function (files) {
            var file, formData, handleError, headerName, headerValue, headers, i, input, inputName, inputType, key, method, option, progressObj, response, updateProgress, url, value, xhr, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, xhr_upload, option_params, form_input_el_query, input_options, lower_input_type, filenumber;
            xhr = new XMLHttpRequest();
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file     = files[_i];
                file.xhr = xhr;
            }
            method                 = resolveOption(this.options.method, files);
            url                    = resolveOption(this.options.url, files);
            xhr.open(method, url, true);
            xhr.withCredentials    = !!this.options.withCredentials;
            response               = null;
            handleError            = (function (_this) {
                return function () {
                    var _j, _len1, _results;
                    _results = [];
                    for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
                        file = files[_j];
                        _results.push(_this._errorProcessing(files, response || _this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr));
                    }
                    return _results;
                };
            })(this);
            updateProgress         = (function (_this) {
                return function (e) {
                    var allFilesFinished, progress, _j, _k, _l, _len1, _len2, _len3, _results;
                    if (e != null) {
                        progress = 100 * e.loaded / e.total;
                        for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
                            file        = files[_j];
                            file.upload = {
                                progress:  progress,
                                total:     e.total,
                                bytesSent: e.loaded
                            };
                        }
                    } else {
                        allFilesFinished = true;
                        progress         = 100;
                        for (_k = 0, _len2 = files.length; _k < _len2; _k++) {
                            file = files[_k];
                            if (!(file.upload.progress === 100 && file.upload.bytesSent === file.upload.total)) {
                                allFilesFinished = false;
                            }
                            file.upload.progress  = progress;
                            file.upload.bytesSent = file.upload.total;
                        }
                        if (allFilesFinished) {
                            return;
                        }
                    }
                    _results = [];
                    for (_l = 0, _len3 = files.length; _l < _len3; _l++) {
                        file = files[_l];
                        console.log(file);
                        _results.push(_this.emit("uploadprogress", file, progress, file.upload.bytesSent));
                    }
                    return _results;
                };
            })(this);
            xhr.onload             = (function (_this) {
                return function (e) {
                    var xhr_status;
                    if (files[0].status === Filedrop.CANCELED) {
                        return;
                    }
                    if (xhr.readyState !== 4) {
                        return;
                    }
                    response = xhr.responseText;
                    if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
                        try {
                            response = JSON.parse(response);
                        } catch (_error) {
                            e        = _error;
                            response = "Invalid JSON response from server.";
                        }
                    }
                    updateProgress();
                    if (!((200 <= (xhr_status = xhr.status) && xhr_status < 300))) {
                        return handleError();
                    } else {
                        return _this._finished(files, response, e);
                    }
                };
            })(this);
            xhr.onerror            = (function (_this) {
                return function () {
                    if (files[0].status === Filedrop.CANCELED) {
                        return;
                    }
                    return handleError();
                };
            })(this);
            progressObj            = (xhr_upload = xhr.upload) != null ? xhr_upload : xhr;
            progressObj.onprogress = updateProgress;
            headers                = {
                "Accept":           "application/json",
                "Cache-Control":    "no-cache",
                "X-Requested-With": "XMLHttpRequest"
            };
            if (this.options.headers) {
                extend(headers, this.options.headers);
            }
            for (headerName in headers) {
                headerValue = headers[headerName];
                xhr.setRequestHeader(headerName, headerValue);
            }
            formData = new FormData();
            if (this.options.params) {
                option_params = this.options.params;
                for (key in option_params) {
                    if (!option_params.hasOwnProperty(key)) continue;
                    value = option_params[key];
                    formData.append(key, value);
                }
            }
            for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
                file = files[_j];
                this.emit("sending", file, xhr, formData);
            }
            if (this.options.uploadMultiple) {
                this.emit("sendingmultiple", files, xhr, formData);
            }
            if (this.element.tagName === "FORM") {
                form_input_el_query = this.element.querySelectorAll("input, textarea, select, button");
                for (_k = 0, _len2 = form_input_el_query.length; _k < _len2; _k++) {
                    input     = form_input_el_query[_k];
                    inputName = input.getAttribute("name");
                    inputType = input.getAttribute("type");
                    if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
                        input_options = input.options;
                        for (_l = 0, _len3 = input_options.length; _l < _len3; _l++) {
                            option = input_options[_l];
                            if (option.selected) {
                                formData.append(inputName, option.value);
                            }
                        }
                    } else if (!inputType || ((lower_input_type = inputType.toLowerCase()) !== "checkbox" && lower_input_type !== "radio") || input.checked) {
                        formData.append(inputName, input.value);
                    }
                }
            }
            for (i = _m = 0, filenumber = files.length - 1; 0 <= filenumber ? _m <= filenumber : _m >= filenumber; i = 0 <= filenumber ? ++_m : --_m) {
                formData.append(this._getParamName(i), files[i], files[i].name);
            }
            return xhr.send(formData);
        },
        getQueuedFiles: function () {
            return this.getFilesWithStatus(Filedrop.QUEUED);
        },

        getFilesWithStatus: function (status) {
            var file, _i, _len, _results;
            var files = this.files;
            _results  = [];
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                if (file.status === status) {
                    _results.push(file);
                }
            }
            return _results;
        },
        getUploadingFiles:  function () {
            return this.getFilesWithStatus(Filedrop.UPLOADING);
        },
        getActiveFiles:     function () {
            var file, _i, _len, files, _results;
            files    = this.files;
            _results = [];
            for (_i = 0, _len = files.length; _i < _len; _i++) {
                file = files[_i];
                if (file.status === Filedrop.UPLOADING || file.status === Filedrop.QUEUED) {
                    _results.push(file);
                }
            }
            return _results;
        },
        getAcceptedFiles:   function () {
            var file, _i, _len, _ref, _results;
            _ref     = this.files;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                file = _ref[_i];
                if (file.accepted) {
                    _results.push(file);
                }
            }
            return _results;
        },
        getRejectedFiles:   function () {
            var file, _i, _len, _ref, _results;
            _ref     = this.files;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                file = _ref[_i];
                if (!file.accepted) {
                    _results.push(file);
                }
            }
            return _results;
        },

        updateTotalUploadProgress: function () {
            var activeFiles, file, totalBytes, totalBytesSent, totalUploadProgress, _i, _len, active_files;
            totalBytesSent = 0;
            totalBytes     = 0;
            activeFiles    = this.getActiveFiles();
            if (activeFiles.length) {
                active_files = this.getActiveFiles();
                for (_i = 0, _len = active_files.length; _i < _len; _i++) {
                    file = active_files[_i];
                    totalBytesSent += file.upload.bytesSent;
                    totalBytes += file.upload.total;
                }
                totalUploadProgress = 100 * totalBytesSent / totalBytes;
            } else {
                totalUploadProgress = 100;
            }
            return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
        },
        getFallbackForm:           function () {
            var existingFallback, form;
            if (existingFallback = this.getExistingFallback()) {
                return existingFallback;
            }
            var fi_string = [
                "<div class=\"sm-fallback\">",
                this.options.dictFallbackText ? "<p>" + this.options.dictFallbackText + "</p>" : '',
                "<input type=\"file\" name=\"",
                (this._getParamName(0)),
                "\" ",
                (this.options.uploadMultiple ? 'multiple="multiple"' : void 0),
                " /><input type=\"submit\" value=\"Upload!\"></div>"
            ].join('');
            var fields    = Filedrop.createElement(fi_string);
            if (this.element.tagName !== "FORM") {
                var form_string = [
                    "<form action=\"",
                    this.options.url,
                    "\" enctype=\"multipart/form-data\" method=\"",
                    this.options.method,
                    "\"></form>"
                ].join('');
                form            = Filedrop.createElement(form_string);
                form.appendChild(fields);
            } else {
                this.element.setAttribute("enctype", "multipart/form-data");
                this.element.setAttribute("method", this.options.method);
            }
            return !!form ? form : fields;
        },
        getExistingFallback:       function () {
            var fallback, getFallback, tagName, _i, _len, tagname_arr;
            getFallback = function (elements) {
                var el, _i, _len;
                for (_i = 0, _len = elements.length; _i < _len; _i++) {
                    el = elements[_i];
                    if (/(^| )fallback($| )/.test(el.className)) {
                        return el;
                    }
                }
            };
            tagname_arr = ["div", "form"];
            for (_i = 0, _len = tagname_arr.length; _i < _len; _i++) {
                tagName = tagname_arr[_i];
                if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {
                    return fallback;
                }
            }
        },
        setupEventListeners:       function () {
            var elementListeners, event, listener, _i, _len, listeners, _results;
            listeners = this.listeners;
            _results  = [];
            for (_i = 0, _len = listeners.length; _i < _len; _i++) {
                elementListeners = listeners[_i];
                _results.push((function () {
                    var ele_listen_events, _results1;
                    ele_listen_events = elementListeners.events;
                    _results1         = [];
                    for (event in ele_listen_events) {
                        if (!ele_listen_events.hasOwnProperty(event)) continue;
                        listener = ele_listen_events[event];
                        _results1.push(elementListeners.element.addEventListener(event, listener, false));
                    }
                    return _results1;
                })());
            }
            return _results;
        },
        removeEventListeners:      function () {
            var elementListeners, event, listener, _i, _len, listeners, _results;
            listeners = this.listeners;
            _results  = [];
            for (_i = 0, _len = listeners.length; _i < _len; _i++) {
                elementListeners = listeners[_i];
                _results.push((function () {
                    var _ele_listeners, _results1;
                    _ele_listeners = elementListeners.events;
                    _results1      = [];
                    for (event in _ele_listeners) {
                        listener = _ele_listeners[event];
                        _results1.push(elementListeners.element.removeEventListener(event, listener, false));
                    }
                    return _results1;
                })());
            }
            return _results;
        }
    });

    Filedrop.ADDED      = "added";
    Filedrop.QUEUED     = "queued";
    Filedrop.ACCEPTED   = Filedrop.QUEUED;
    Filedrop.UPLOADING  = "uploading";
    Filedrop.PROCESSING = Filedrop.UPLOADING;
    Filedrop.CANCELED   = "canceled";
    Filedrop.ERROR      = "error";
    Filedrop.SUCCESS    = "success";

    Filedrop.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i];
    Filedrop.isBrowserSupported  = function () {
        var capableBrowser, regex, _i, _len, blacklist;
        capableBrowser = true;
        if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
            if (!("classList" in document.createElement("a"))) {
                capableBrowser = false;
            } else {
                blacklist = Filedrop.blacklistedBrowsers;
                for (_i = 0, _len = blacklist.length; _i < _len; _i++) {
                    regex = blacklist[_i];
                    if (regex.test(navigator.userAgent)) {
                        capableBrowser = false;

                    }
                }
            }
        } else {
            capableBrowser = false;
        }
        return capableBrowser;
    };

    Filedrop.instances     = [];
    Filedrop.options       = {};
    Filedrop.createElement = u.createElement;

    Filedrop.forElement    = function (element) {
        if (typeof element === "string") {
            element = document.querySelector(element);
        }
        if ((element != null ? element.filedrop : void 0) == null) {
            throw new Error("No Filedrop found for given element. This is probably because you're trying to access it before Filedrop had the time to initialize. Use the `init` option to setup any additional observers on your Filedrop.");
        }
        return element.filedrop;
    };
    Filedrop.elementInside = function (element, container) {
        if (element === container) {
            return true;
        }
        while (element = element.parentNode) {
            if (element === container) {
                return true;
            }
        }
        return false;
    };
    Filedrop.getElement    = function (el, name) {
        var element;
        if (typeof el === "string") {
            element = document.querySelector(el);
        } else if (el.nodeType != null) {
            element = el;
        }
        if (element == null) {
            throw new Error("Invalid selector or HTML element provided for '" + name + "'.");
        }
        return element;
    };
    Filedrop.getElements   = function (els, name) {
        var e, el, elements, _i, _j, _len, _len1, _ele_qry;
        if (els instanceof Array) {
            elements = [];
            try {
                for (_i = 0, _len = els.length; _i < _len; _i++) {
                    el = els[_i];
                    elements.push(this.getElement(el, name));
                }
            } catch (_error) {
                e        = _error;
                elements = null;
            }
        } else if (typeof els === "string") {
            elements = [];
            _ele_qry = document.querySelectorAll(els);
            for (_j = 0, _len1 = _ele_qry.length; _j < _len1; _j++) {
                el = _ele_qry[_j];
                elements.push(el);
            }
        } else if (els.nodeType != null) {
            elements = [els];
        }
        if (!((elements != null) && elements.length)) {
            throw new Error("Invalid selector or HTML element provided for '" + name + "'. Please make els a list or node/selector");
        }
        return elements;
    };

    Filedrop.confirm     = function (question, accepted, rejected) {
        if (window.confirm(question)) {
            return accepted();
        } else if (rejected != null) {
            return rejected();
        }
    };
    Filedrop.isValidFile = function (file, acceptedFiles) {
        var baseMimeType, mimeType, validType, _i, _len;
        if (!acceptedFiles) {
            return true;
        }
        acceptedFiles = acceptedFiles.split(",");
        mimeType      = file.type;
        baseMimeType  = mimeType.replace(/\/.*$/, "");
        for (_i = 0, _len = acceptedFiles.length; _i < _len; _i++) {
            validType = acceptedFiles[_i];
            validType = validType.trim();
            if (validType.charAt(0) === ".") {
                if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
                    return true;
                }
            } else if (/\/\*$/.test(validType)) {
                if (baseMimeType === validType.replace(/\/.*$/, "")) {
                    return true;
                }
            } else {
                if (mimeType === validType) {
                    return true;
                }
            }
        }
        return false;
    };

    return Filedrop;
})
;