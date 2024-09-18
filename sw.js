/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2024/07/18/Nacos漏洞/index.html","d936c32d1a3f45eb9db49cca0c8a133c"],["/2024/07/18/upload-labs靶场全通关/index.html","b5369ba11637cb3d7901cc80b5e443b7"],["/2024/08/04/再战upload/index.html","8609264f618bf23332471b0da9b03973"],["/2024/08/14/Django实践/index.html","5cf0c181e3b9a560f0526d4bc6906db6"],["/2024/08/15/前端三件套/index.html","62f2624a88cfd8f7cb7f69acb014711d"],["/2024/09/02/算法基础/index.html","a7175814e713615bf3d853e5ebc37ccb"],["/archives/2024/07/index.html","96ff9ce56e6b9477dade633fffa041e9"],["/archives/2024/08/index.html","19cccacd7e18048859b473f8414c76da"],["/archives/2024/09/index.html","11c1314df0d4af760c9d308818285ba1"],["/archives/2024/index.html","892e636b4bd356158097ac899a41b902"],["/archives/index.html","fb045672a59c2f32e88b69a0566d7013"],["/assets/algolia/algoliasearch.js","e1939ee8319fde69d3c9f101c6f59059"],["/assets/algolia/algoliasearch.min.js","9c5e51e57e2b1d888950bf4cb5708c49"],["/assets/algolia/algoliasearchLite.js","6eb6a013a255e154b4cbace0d4cc265f"],["/assets/algolia/algoliasearchLite.min.js","c2d71f042c879659dbc97f8853b62f21"],["/categories/Web开发/Web框架/index.html","a90d09ea40e4a1af95b121d9c65638c3"],["/categories/Web开发/index.html","e6613c2c52eea90ef35eb6634193deaa"],["/categories/Web开发/前端三剑客/index.html","22c813bc3a5ff2574b650dc6271d7c3d"],["/categories/index.html","f3b6a6ff591f535651048853b5782c41"],["/categories/渗透测试/index.html","c4ba22399256cbb2c1630a6ef46a896c"],["/categories/渗透测试/test.html","0b7bf48bb609091f40285ae4a670b2af"],["/categories/渗透测试/基本漏洞/index.html","6bbd44ebd40bc978dd433566ce6e01ea"],["/categories/渗透测试/基本漏洞/文件上传/index.html","0448880819394bde65060f0fae8a1ec8"],["/categories/渗透测试/框架漏洞/index.html","2d8b3c52779d1a2acf4b0c4232edbe2c"],["/categories/算法/index.html","2d7fa0ef8d90283bd015f2b44da611fe"],["/categories/算法/算法入门/index.html","07ac9f9a5a98287dbc106a79137eba12"],["/css/custom.css","63cdc2bf598dbdc2f7f56cb9b0a069a0"],["/css/icat.css","8021d194de478b57a39c51e98649741f"],["/css/index.css","0b71133327bf7b722fefd833f5e0111e"],["/css/modify.css","606567c410f645cb5cb42c971e215d64"],["/css/tianli_gpt.css","4b4fffbce91f897146db9196a1b0597b"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/index.html","2e452f3828b5a47aaf409378a5e40df0"],["/js/fadeIn.js","b6557cbb70560755edd07ad26e2c210f"],["/js/main.js","38027e30074189a55dcdf5836ea24afe"],["/js/search/algolia.js","429496a228c385e1751d81bae8367bee"],["/js/search/local-search.js","2a0d1070b5181814ed69e3f4e9e4752b"],["/js/tianli_gpt.min.js","0f4fb4ea2e1d69ac0ab3ffb41a717a3d"],["/js/tw_cn.js","5cf4330690042a0a4821500b7f6513c8"],["/js/txmap.js","d1ad7c911003d2fcefd938a560a29ad7"],["/js/utils.js","0e0436b0a10a61aa67a5786ca2c2d447"],["/link/index.html","bd3e6ff90d188c5163c90a374b227238"],["/sw-register.js","2d6bbef85bad748b08247bc2d98bc7fe"],["/tags/Web框架/index.html","89f54f0cfccb2982fee0b06c5c165574"],["/tags/Web程序设计/index.html","9926bb2a6330a30b23f6bbc110dd202c"],["/tags/index.html","9d44f41db991675799605c6e9013587b"],["/tags/前端/index.html","38994483ef395746c872b8f5858fb09b"],["/tags/渗透测试/index.html","f718de814d01cedd2022b29e035247e2"],["/tags/算法/index.html","b44df4d1bc2eb707ad8cc9360455da12"]];
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
