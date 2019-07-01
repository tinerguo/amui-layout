/**
 * Created by tiner on 2018/8/9.
 */
var interval_id,
        last_hash,
        cache_bust = 1, rm_callback, FALSE = !1, postMessage = 'postMessage',
        addEventListener = 'addEventListener',

        p_receiveMessage;
var has_postMessage = true;//window['postMessage'] && !$.browser.opera;


function postMessage(message, target_url, target) {
        if (!target_url) {
                return;
        }


        message = typeof message === 'string' ? message : JSON.stringify(message);

        target = target || parent;

        if (has_postMessage) {
                target[postMessage](message, target_url.replace(/([^:]+:\/\/[^\/]+).*/, '$1'));

        } else if (target_url) {
                target.location = target_url.replace(/#.*$/, '') + '#' + (+new Date) + (cache_bust++) + '&' + message;
        }
};

function isFunction(obj) {
        return (obj == null ? String(obj) : class2type[toString.call(obj)] || "object")  === "function";
}


function receiveMessage(callback, source_origin, delay) {
        if (has_postMessage) {

                if (callback) {
                        rm_callback && p_receiveMessage();

                        rm_callback = function (e) {
                                if (( typeof source_origin === 'string' && e.origin !== source_origin )
                                        || ( isFunction(source_origin) && source_origin(e.origin) === FALSE )) {
                                        return FALSE;
                                }
                                callback(e);
                        };
                }
                if (window[addEventListener]) {
                        window[callback ? addEventListener : 'removeEventListener']('message', rm_callback, FALSE);
                } else {
                        window[callback ? 'attachEvent' : 'detachEvent']('onmessage', rm_callback);
                }

        } else {

                interval_id && clearInterval(interval_id);
                interval_id = null;

                if (callback) {
                        delay = typeof source_origin === 'number'
                                ? source_origin
                                : typeof delay === 'number'
                                ? delay
                                : 100;

                        interval_id = setInterval(function () {
                                var hash = document.location.hash,
                                        re = /^#?\d+&/;
                                if (hash !== last_hash && re.test(hash)) {
                                        last_hash = hash;
                                        callback({data: hash.replace(re, '')});
                                }
                        }, delay);
                }
        }
};



export {
        postMessage,
        receiveMessage
}