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

  const deactivate = () => {
    let nodesList = document.querySelectorAll("[class^='diagram-node']");
    let nodesArray = [...nodesList];
    let activeNode = nodesArray.find((node) => (
      node.classList.contains('active')
    ));
    activeNode.classList.remove('active');
  }

  const activate = (node) => node.classList.add("active");

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

  const previous = () => console.log("left");

  const next = () => console.log("right");

  init();
}());