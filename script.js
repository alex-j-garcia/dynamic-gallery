"use strict";

(function() {
  const init = () => {
    let nodesList = document.querySelectorAll("[class^='diagram-node']");
    [...nodesList].forEach((node) => node.addEventListener("click", showcase));
    let arrows = document.querySelectorAll("[class*='arrow']");
    [...arrows].forEach((arrow) => {
      if (arrow.classList.contains("gallery-left-arrow")) {
        arrow.addEventListener("click", previous);
      } else {
        arrow.addEventListener("click", next);
      }
    });
  };

  const showcase = ({currentTarget}) => {
    deactivate();
    activate(currentTarget);
    showContent(currentTarget, hideContent());
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
    } else if (index == RIGHT_DISABLE) {
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

    deactivate();
    activate(nodesArray[index]);
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

    deactivate();
    activate(nodesArray[index]);
    arrowController(index);
  };

  const deactivate = () => {
    let nodesList = document.querySelectorAll("[class^='diagram-node']");
    let nodesArray = [...nodesList];
    let activeNode = nodesArray.find((node) => (
      node.classList.contains('active')
    ));
    activeNode.classList.remove('active');
  }

  const activate = (node) => {
    let nodesList = document.querySelectorAll("[class^='diagram-node']");
    let nodesArray = [...nodesList];
    let index = nodesArray.findIndex((n) => n == node);
    arrowController(index);
    node.classList.add("active");
  }

  const hideContent = (node) => {
    let articlesList = document.querySelectorAll('article');
    let articlesArray = [...articlesList];
    let visibleArticle = articlesArray.find((article) => (
      article.classList.contains("article-visible")
    ));
    return visibleArticle.classList.remove("article-visible") || articlesArray;
  };

  const showContent = (node, articles) => {
    let contentID = node.getAttribute("data-id");
    let article = articles.find((article) => (
      article.getAttribute("data-content") == contentID
    ));
    article.classList.add("article-visible");
  };

  init();
}());