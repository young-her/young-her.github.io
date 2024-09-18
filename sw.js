/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/07/18/Nacos漏洞/index.html","3d180e547072e9ce7b1a8e982d3f5b53"],["/2024/07/18/upload-labs靶场全通关/index.html","4cebeffc78498b24930667f517913c52"],["/2024/08/04/再战upload/index.html","93c5a271b4c63b54ccfa62614ff72de4"],["/2024/08/14/Django实践/index.html","6c9dff5e59111ee808ca52eb24b261f1"],["/2024/08/15/前端三件套/index.html","787c077ba75048ad3c1e07e0592e694b"],["/2024/09/02/算法基础/index.html","5c84f3d43cd39293b85cb3f7cff8c3fd"],["/archives/2024/07/index.html","8f213687fe274ccca86a853d93e264cd"],["/archives/2024/08/index.html","14b13453d3623eccc378e5bddf2d52d6"],["/archives/2024/09/index.html","f8331e73ce89d01de36b8782f8d7a569"],["/archives/2024/index.html","8ce61fb719a1409bdd0cf1f9e7f0dd3c"],["/archives/index.html","6306cf26a0357236652cab70d3e2f313"],["/assets/algolia/algoliasearch.js","e1939ee8319fde69d3c9f101c6f59059"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","6eb6a013a255e154b4cbace0d4cc265f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/categories/Web开发/Web框架/index.html","71c689b0e3caf1abcc7c98f31031c44e"],["/categories/Web开发/index.html","84ab44e5bdc85b6d68e8435cfd58e036"],["/categories/Web开发/前端三剑客/index.html","a35677ec0e572b88b36abeb1b2ab5c75"],["/categories/index.html","0cbcc741a71cfe78b57fb355c0bfacda"],["/categories/渗透测试/index.html","2815bfad75d2b8db82864865da20941b"],["/categories/渗透测试/test.html","bdabccf8828f3cd31fd5060afaf43518"],["/categories/渗透测试/基本漏洞/index.html","78a53c32d26076ac37afa64372655def"],["/categories/渗透测试/基本漏洞/文件上传/index.html","efb6c24774d74e2984201e907585d61e"],["/categories/渗透测试/框架漏洞/index.html","b43d55d04281b001db1fc3697bab46d1"],["/categories/算法/index.html","6f716a14b576bdbb4fde54713eed1301"],["/categories/算法/算法入门/index.html","83eaa7805d74422a871fae78b1b0c880"],["/css/custom.css","63cdc2bf598dbdc2f7f56cb9b0a069a0"],["/css/icat.css","8021d194de478b57a39c51e98649741f"],["/css/index.css","0b71133327bf7b722fefd833f5e0111e"],["/css/modify.css","606567c410f645cb5cb42c971e215d64"],["/css/tianli_gpt.css","4b4fffbce91f897146db9196a1b0597b"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/index.html","3f70eab414fbc81da7e682c6e2d8b044"],["/js/fadeIn.js","b6557cbb70560755edd07ad26e2c210f"],["/js/main.js","38027e30074189a55dcdf5836ea24afe"],["/js/search/algolia.js","429496a228c385e1751d81bae8367bee"],["/js/search/local-search.js","2a0d1070b5181814ed69e3f4e9e4752b"],["/js/tianli_gpt.min.js","0f4fb4ea2e1d69ac0ab3ffb41a717a3d"],["/js/tw_cn.js","5cf4330690042a0a4821500b7f6513c8"],["/js/txmap.js","d1ad7c911003d2fcefd938a560a29ad7"],["/js/utils.js","0e0436b0a10a61aa67a5786ca2c2d447"],["/link/index.html","1cb67bba3d8d4d2809e388f8ecb0c46a"],["/sw-register.js","8dbc9898d1ea2b19d8b32b5ab0d4578f"],["/tags/Web框架/index.html","33212696833f9a14021f8ccfad60d69c"],["/tags/Web程序设计/index.html","03f05b3fc5ccb3ff396b14c871a58f25"],["/tags/index.html","2aa4e9f9919bb9915ff776d4f8e66243"],["/tags/前端/index.html","79c4269c4226285bc552c16bb19b7b4e"],["/tags/渗透测试/index.html","e989f00499a7f115ee2d9fcff3e5e560"],["/tags/算法/index.html","1ca733b3ce013e77a0cd228205404992"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
