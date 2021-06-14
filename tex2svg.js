// Based roughly on preload/tex2svg from
// https://github.com/mathjax/MathJax-demos-node

MathJax = {
  tex: { packages: ["base", "autoload", "require", "ams", "newcommand"] },
  svg: { fontCache: "none" },
  startup: { typeset: false },
};

import "mathjax-full/components/src/startup/lib/startup.js"
import "mathjax-full/components/src/core/core.js"
import "mathjax-full/components/src/adaptors/liteDOM/liteDOM.js"
import "mathjax-full/components/src/input/tex/tex.js"
import "mathjax-full/components/src/output/svg/svg.js"
import "mathjax-full/components/src/output/svg/fonts/tex/tex.js"
import "mathjax-full/components/src/startup/startup.js"

MathJax.loader.preLoad(
  "core",
  "adaptors/liteDOM",
  "input/tex",
  "output/svg",
  "output/svg/fonts/tex"
);
MathJax.config.startup.ready();

export const tex2svg = ({ formula, display, em, ex, containerWidth }) => {
  const node = MathJax.tex2svg(formula, {
    display,
    em: em ?? 16,
    ex: ex ?? 8,
    containerWidth: containerWidth ?? 80 * 16,
  });

  const svg = MathJax.startup.adaptor
    .outerHTML(node)

  return svg
};
