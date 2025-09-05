(function(){
  // Determine current language from first URL segment; default en.
  function currentLang(){
    const seg = location.pathname.split('/').filter(Boolean)[0];
    return ['pl','ru'].includes(seg) ? seg : 'en';
  }
  const lang = currentLang();
  const defaultLang = 'en';

  // Classify document location inside search_index.json
  function docLang(loc){
    if(loc.startsWith('pl/')) return 'pl';
    if(loc.startsWith('ru/')) return 'ru';
    // root docs ('' or paths without leading locale) => default language
    return defaultLang;
  }

  function filterIndexData(data){
    if(!data || !Array.isArray(data.docs)) return data;
    data.docs = data.docs.filter(d => docLang(d.location) === lang);
    return data;
  }

  // Utility to wrap JSON object into Response
  function jsonResponse(obj){
    const blob = new Blob([JSON.stringify(obj)], {type:'application/json'});
    return new Response(blob, {status:200, headers:{'Content-Type':'application/json'}});
  }

  // Patch fetch BEFORE user opens search (extra_javascript loads before search fetch happens)
  if(window.fetch){
    const origFetch = window.fetch.bind(window);
    window.fetch = function(input, init){
      let url = typeof input === 'string' ? input : (input && input.url) || '';
      // Heuristics: Material requests '*search_index.json' (possibly relative)
      if(/search_index\.json(?:$|[?#])/.test(url)){
        return origFetch(input, init).then(resp => resp.json().then(data => jsonResponse(filterIndexData(data))));
      }
      return origFetch(input, init);
    };
  }

  // Patch XMLHttpRequest fallback (just in case)
  (function(){
    const OrigXHR = window.XMLHttpRequest;
    if(!OrigXHR) return;
    function PatchedXHR(){
      const xhr = new OrigXHR();
      let targetSearch = false;
      let responseData = null;
      const open = xhr.open;
      xhr.open = function(method, url){
        if(/search_index\.json(?:$|[?#])/.test(url)) targetSearch = true; else targetSearch = false;
        return open.apply(xhr, arguments);
      };
      const send = xhr.send;
      xhr.send = function(){
        if(!targetSearch) return send.apply(xhr, arguments);
        xhr.addEventListener('readystatechange', function(){
          if(xhr.readyState === 4 && xhr.status === 200){
            try {
              responseData = filterIndexData(JSON.parse(xhr.responseText));
            } catch(e) { /* ignore parse errors */ }
          }
        });
        return send.apply(xhr, arguments);
      };
      Object.defineProperty(xhr, 'responseText', {
        get(){
          if(responseData) return JSON.stringify(responseData);
          return OrigXHR.prototype.__lookupGetter__('responseText') ? OrigXHR.prototype.__lookupGetter__('responseText').call(xhr) : '';
        }
      });
      return xhr;
    }
    window.XMLHttpRequest = PatchedXHR;
  })();

  // Optional: expose current language for debugging
  window.__SEARCH_LANG__ = lang;
})();
