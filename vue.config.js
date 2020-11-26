module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                // '@': 'src',
                'assets': '@/assets',
                'common': '@/common',
                'views': '@/views',
                'components': '@/components',
                'network': '@/network',

            }
        }
    }
}