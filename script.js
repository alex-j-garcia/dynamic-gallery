"use strict";

(function() {
  const init = () => {
    let nodesList = document.querySelectorAll("[class^='diagram-node']");
    [...nodesList].forEach(node => node.addEventListener("click", showcase));
  };

  const showcase = ({currentTarget}) => {
    let lastActive = deactivate();
    let current = activate(currentTarget);
  }

  const deactivate = () => {
    let nodesList = document.querySelectorAll("[class^='diagram-node']");
    let nodesArray = [...nodesList];
    let activeNode = nodesArray.find(node => node.classList.contains('active'));
    return activeNode.classList.remove('active') || activeNode;
  }

  const activate = node => {
    if (node.classList.contains("node--tiny")) {
      return node.offsetParent.classList.add(".active") || node.offsetParent;
    }

    return node.classList.add("active") || node;
  }

  init();
})();