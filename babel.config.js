module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@": "./src",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
            "@services": "./src/services",
            "@hooks": "./src/hooks",
            "@constants": "./src/constants",
            "@utils": "./src/utils",
            
            // Backwards compatibility (temporary)
            "Hooks": "./src/hooks", 
            "constant": "./src/constants",
            "utils": "./src/utils"
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
