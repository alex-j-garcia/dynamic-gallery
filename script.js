"use strict";

(function() {
  const init = () => {
    let nodesList = document.querySelectorAll("[class^='diagram-node']");
    let arrows = document.querySelectorAll("[class*='arrow']");
    [...nodesList].forEach((node) => node.addEventListener("click", showcase, {list: nodesList}));
    [...arrows].forEach((arrow) => {
      if (arrow.classList.contains("gallery-left-arrow")) {
        arrow.addEventListener("click", previous);
      } else {
        arrow.addEventListener("click", next);
      }
    });
  };

  const showcase = ({currentTarget}) => {
    let articlesArray = [...document.querySelectorAll("article")];
    let diagramNodes = document.querySelectorAll("[class^='diagram-node']");
    let nodesArray = [...diagramNodes];
    deactivate(nodesArray);
    activate(nodesArray, currentTarget);
    showContent(currentTarget, hideContent(articlesArray));
  }

  const arrowController = (index) => {
    const LEFT_DISABLE = 0;
    const RIGHT_DISABLE = 5;

    let disabled = document.querySelector("[class*='disabled']");
    if (disabled) disabled.classList.remove("disabled");

    if (index == LEFT_DISABLE) {
      let leftArrow = document.querySelector(".gallery-left-arrow");
      leftArrow.classList.add("disabled");
      return;
    }

    if (index == RIGHT_DISABLE) {
      let rightArrow = document.querySelector(".gallery-right-arrow");
      rightArrow.classList.add("disabled");
      return;
    }
  };

  const previous = ({currentTarget}) => {
    if (currentTarget.classList.contains("disabled")) {
      return;
    }

    let nodesList = document.querySelectorAll("[class^='diagram-node']");
    let nodesArray = [...nodesList];
    let index = nodesArray.findIndex((node) => (
      node.classList.contains("active")
    )) - 1;

    deactivate(nodesArray);
    activate(nodesArray, nodesArray[index]);

    // TODO: refactor this
    let articles = [...document.querySelectorAll("article")];
    showContent(nodesArray[index], hideContent(articles));
    
    arrowController(index);
  };

  const next = ({currentTarget}) => {
    if (currentTarget.classList.contains("disabled")) {
      return;
    }

    let nodesList = document.querySelectorAll("[class^='diagram-node']");
    let nodesArray = [...nodesList];
    let index = nodesArray.findIndex((node) => (
      node.classList.contains("active")
    )) + 1;

    deactivate(nodesArray);
    activate(nodesArray, nodesArray[index]);

    // TODO: refactor this
    let articles = [...document.querySelectorAll("article")];
    showContent(nodesArray[index], hideContent(articles));

    arrowController(index);
  };

  const deactivate = (nodes) => {
    nodes.forEach((n) => n.classList.remove('active'));
  }

  const activate = (nodes, target) => {
    let index = nodes.findIndex((n) => n == target);
    arrowController(index);
    target.classList.add("active");
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
