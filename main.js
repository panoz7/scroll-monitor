
class ScrollMonitor {

    constructor(output) {
        this.currentPos = window.scrollX; 
        this.scrollEvents = [];
        this.output = output;
        // Start tracking the current scroll position
        window.requestAnimationFrame(this.getCurrentPos.bind(this));

    }

    getCurrentPos() {
        // Update the current position
        this.currentPos = window.scrollX;
        
        // Get the current size of a vh
        this.currentVh = window.innerHeight / 768;

        // Handle any scroll events
        this.handleScrollEVents();

        // Output the scroll pos
        if (this.output) {
            this.output.innerHTML = this.currentPos;
        }

        window.requestAnimationFrame(this.getCurrentPos.bind(this));
    }

    addScrollEvent(startPos, startAction) {
        this.scrollEvents.push({
            startPos, startAction
        })
    }

    handleScrollEVents() {
        for (event of this.scrollEvents) {
            if (!event.hasFired && this.currentPos >= event.startPos * this.currentVh) {
                event.hasFired = true;
                event.startAction();
            }
        }
    }


}


const scrollMonitor = new ScrollMonitor(document.getElementById('scroll-position'));
const designedHeight = 768;

const content = document.getElementById('content');
const circles = [
    {
        x: 500,
        y: 300,
    },
    {
        x: 1000,
        y: 100, 
    },
    {
        x: 1600, 
        y: 400
    }
]

circles.forEach(circleData => {
    // Creat the cirlce
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.left = (circleData.x * .1302) + 'vh';
    circle.style.top = (circleData.y * .1302) + 'vh';

    // Add it to the DOM
    content.appendChild(circle);

    // Add scroll events that fade the circles in 700px before
    scrollMonitor.addScrollEvent(circleData.x - 750, () => {
        circle.classList.add('active');
    })
})


// const circle1 = document.getElementById('circle1');

// scrollMonitor.addScrollEvent(400, () => {
//     circle1.classList.add('active');
// })

// console.log(scrollMonitor.scrollEvents);



// scrollPosition.addEventListener('click', e => {

//     scrollMonitor.getCurrentPos();

// })

// function getCurrentPos() {
//     scrollPosition.innerHTML = window.scrollX;
//     window.requestAnimationFrame(getCurrentPos);
// }


// window.requestAnimationFrame(getCurrentPos);