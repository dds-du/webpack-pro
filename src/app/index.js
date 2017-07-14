import component from '@/component'
import changeTitle from '@/test'
import '@/commen.css'
import '../../libs/jquery-1.9.1.min.js'

//支持热更新
process.env.NODE_ENV==='production'?1:module.hot.accept()

document.body.appendChild(component('dds1231'))
changeTitle()
//alert($(window))

