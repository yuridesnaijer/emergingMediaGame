/**
 * Created by yuri on 07/03/16.
 */
// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (e) {
            console.log(e.pageX, e.pageY);
            findIntersection();

        }
    });

function findIntersection() {
    var elements = document.getElementsByClassName('draggable');

    for(var i = 0; i < elements.length; i++) {
        for(var j = 0; j < elements.length; j++) {

            var rect1 = elements[i].getBoundingClientRect();
            var rect2 = elements[j].getBoundingClientRect();

            //TODO: find collision: https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements.
            //TODO: prevent comparing to self.
            var overlap = !(rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom);

            console.log(overlap);
        }
    }
}

function dragMoveListener (event) {
    var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;