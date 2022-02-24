"use strict";

(function() {
  const init = () => {
    let nodesList = document.querySelectorAll("[class^='diagram-node']");
    [...nodesList].forEach((node) => node.addEventListener("click", showcase));
    [...document.querySelectorAll("[class*='arrow']")].forEach((arrow) => (
      arrow.addEventListener("click", arrowController)
    ));
  };

  const showcase = ({ currentTarget }) => {
    let articlesArray = [...document.querySelectorAll("article")];
    let diagramNodes = document.querySelectorAll("[class^='diagram-node']");
    let nodesArray = [...diagramNodes];
    deactivate(nodesArray);
    activate(nodesArray, currentTarget);
    showContent(currentTarget, hideContent(articlesArray));
  }

  const arrowController = (eventOrIndex) => {
    const LEFT_DISABLE = 0;
    const RIGHT_DISABLE = 5;

    if (typeof eventOrIndex == "number") {
      let i = eventOrIndex;
      nodeClick(i);
    } else {
      let { currentTarget } = eventOrIndex;
      arrowClick(currentTarget);
    }

    function arrowClick(targetArrow) {
      if (targetArrow.classList.contains('disabled')) {
        return;
      }

      let disabled = document.querySelector("[class*='disabled']");
      if (disabled) {
        disabled.classList.remove("disabled");
      }

      let isLeft = targetArrow.classList.contains("gallery-left-arrow");
      let index;
      if (isLeft) {
        targetArrow = document.querySelector(".gallery-left-arrow");
        index = previous();
      } else {
        targetArrow = document.querySelector(".gallery-right-arrow");
        index = next();
      }

      if (index == LEFT_DISABLE) {
        targetArrow.classList.add("disabled");
        return;
      }

      if (index == RIGHT_DISABLE) {
        targetArrow.classList.add("disabled");
        return;
      }
    }

    function nodeClick(index) {
      let disabled = document.querySelector("[class*='disabled']");
      if (disabled) {
        disabled.classList.remove("disabled");
      }
      
      if (index == LEFT_DISABLE) {
        let arrow = document.querySelector(".gallery-left-arrow");
        arrow.classList.add("disabled");
        return;
      }

      if (index == RIGHT_DISABLE) {
        let arrow = document.querySelector(".gallery-right-arrow");
        arrow.classList.add("disabled");
        return;
      }
    }

  };

  const previous = () => {
    let nodes = [...document.querySelectorAll("[class^='diagram-node']")];
    let index = nodes.findIndex((node) => (
      node.classList.contains("active")
    )) - 1;

    return showcase({ currentTarget: nodes[index] }) || index;
  };

  const next = () => {
    let nodes = [...document.querySelectorAll("[class^='diagram-node']")];
    let index = nodes.findIndex((node) => (
      node.classList.contains("active")
    )) + 1;

    return showcase({ currentTarget: nodes[index] }) || index;
  };

  const deactivate = (nodes) => (
    nodes.forEach((n) => n.classList.remove('active'))
  );

  const activate = (nodes, target) => {
    let index = nodes.findIndex((n) => n == target);
    target.classList.add("active");
    arrowController(index);
  }

  const hideContent = (articles) => (
    articles.forEach((a) => a.classList.remove("article-visible")) || articles
  );

  const showContent = (node, articles) => {
    let contentID = node.getAttribute("data-id");
    let target = articles.find((a) => (
      a.getAttribute("data-content") == contentID
    ));
    target.classList.add("article-visible");
  };

  init();
}());
