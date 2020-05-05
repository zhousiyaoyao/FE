// hash
class HashRouter{
    constructor(){
        this.routers = {}
        window.addEventListener('hashchange', this.load.bind(this), false)
    }
    register(hash, callback = function(){}){
        this.routers[hash] = callback
    }
    registerIndex(callback = function(){}){
        this.routers['index'] = callback
    }
    registerNotFound(callback = function(){}){
        this.routers['404'] = callback
    }
    registerError(callback = function(){}){
        this.routers['error'] = callback
    }
    load(){
        let hash = location.hash.slice(1)
        let handler
        if(!hash){
            handler = this.routers.index
        }else if(!this.routers.hasOwnProperty(hash)){
            handler = this.routers['404'] || function(){}
        }
        else{
            handler = this.routers[hash]
        }
        try{
            handler.apply(this)
        }catch(e){
            console.error(e)
            (this.routers['error'] || function(){}).call(this, e)
        }
    }
}

// history
class HistoryRouter{
    constructor(){
        this.routers = {}
        this.listenPopState()
        this.listenLink()
    }
    listenPopState(){
        window.addEventListener('popstate', (e) => {
            let state = e.state || {}
            let path = state.path || ''
            this.dealPathHandler(path)
        }, false)
    }
    listenLink(){
        window.addEventListener('click',(e) => {
            let dom = e.target
            if(dom.tagName.toUpperCase() === 'A' && dom.getAttribute('href')){
                e.preventDefault()
                this.assign(dom.getAttribute('href'))
            }
        })
    }
    load(){
        let path = location.pathname
        this.dealPathHandler(path)
    }
    register(path, callback = function(){}){
        this.routers[path] = callback
    }
    registerIndex(callback = function(){}){
        this.routers['/'] = callback
    }
    registerNotfound(callback = function(){}){
        this.routers['404'] = callback
    }
    registerError(callback = function(){}){
        this.routers['error'] = callback
    }
    assign(path){
        history.pushState({path}, null, path)
        this.dealPathHandler(path)
    }
    replace(path){
        history.replaceState({path}, null, path)
        this.dealPathHandler(path)
    }
    dealPathHandler(path){
        let handler
        if(!this.routers.hasOwnProperty(path)){
            handler = this.routers['404'] || function(){}
        }else{
            handler = this.routers[path];
        }
        try{
            handler.call(this)
        }catch(e){
            console.error(e)
            (this.routers['error'] || function(){}).call(this, e)
        }
    }
}