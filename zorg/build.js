const website = require('../config')
const compileJS = require('./compilers/javascript')
const compileSass = require('./compilers/sass')
const compileAssets = require('./compilers/assets')

website.build()
compileJS()
compileSass()
compileAssets()
