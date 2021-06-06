'use strict';

export const sideScroll = ((element, direction, speed, distance, step) => {
	var scrollAmount = 0;

  var slideTimer = setInterval(function() {
    if (direction == "left") {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }

    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
});

export const replace = ((val) => {
	let slug = val;
  slug = slug.replace(/\s/g, "-");
  return slug;
})

export const getLink = ((val) => {
  let link = val.link;
  let res = link.split("/");
  res = res[res.length - 1];
  return res;
});

export const getScrollHeight =(() => {
  const element = document.querySelector(".latest").scrollWidth;

  if (element != null) {
    if (element.scrollLeft < 50) {
      const left = document.querySelector(".scroll-left");
      left.style.display = "none";
    } else {
      const left = document.querySelector(".scroll-left");
      left.style.display = "block";
    }
  }
});

