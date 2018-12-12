const path = require('path');

module.exports = function(env, argv) {
    const isProduction = (argv.mode === 'production');

    return {
        mode: argv.mode,
        entry: {
            raygun: './src/boot/raygun.ts',
            cr: './src/boot/cr.ts'
        },
        output: {
            filename: isProduction ? '[name].min.js' : '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: [ '.ts', '.js' ]
        },
    };
}