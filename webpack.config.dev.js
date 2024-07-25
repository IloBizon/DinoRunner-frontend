const path = require('path'); // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const {readFileSync} = require("fs");
const Dotenv = require('dotenv-webpack');
const fs = require("node:fs");

module.exports = {
    entry: [
        './src/index.tsx',
    ],
    output: {

        filename: 'bundle.js', // Имя выходного файла сборки
        path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
        publicPath: '',
    },

    module: {
        rules: [
            {
                test: /\.css$/, // Регулярное выражение для обработки файлов с расширением .css
                use: ['style-loader', 'css-loader'], // Загрузчики, используемые для обработки CSS-файлов
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {

                test: /\.(png|svg|jpg|jpeg|gif)$/i,

                type: 'asset',

            },

        ],
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CopyPlugin({
            patterns: [
                {from: "static", to: 'static'},
            ],
        }),
        new Dotenv()
    ],

    devServer: {
        server: {
            type: 'https',
            options: {
                key: fs.readFileSync("secrets/privkey.pem"),
                cert: fs.readFileSync("secrets/fullchain.pem")
            }
        },
        static: {
            directory: path.join(__dirname, 'dist'), // Каталог для статики
        },
        open: false, // Автоматически открывать браузер
    },

    mode: 'development', // Режим сборки
};