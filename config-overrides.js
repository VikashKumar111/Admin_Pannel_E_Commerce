module.exports = function override(config, env) {
  // Ensure the configuration rules are updated properly
  config.module.rules = config.module.rules.map(rule => {
    if (rule.oneOf) {
      rule.oneOf = rule.oneOf.map(oneOfRule => {
        if (oneOfRule.loader && oneOfRule.loader.includes('source-map-loader')) {
          oneOfRule.exclude = [
            ...(oneOfRule.exclude || []),
            /@antv\/util/
          ];
        }
        return oneOfRule;
      });
    }
    return rule;
  });
  return config;
};

