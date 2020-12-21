const website = require('../config')
const compilerJS = require('./compilers/javascript')
const compilerSass = require('./compilers/sass')
const compilerAssets = require('./compilers/assets')

website.build()
compilerJS()
compilerSass()
compilerAssets()
