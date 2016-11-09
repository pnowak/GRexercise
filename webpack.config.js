module.exports = {
    entry: "./app.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            use: [{
                loader: "babel-loader",
                options: { presets: ["es2015"] }
            }],
        },
    }
};