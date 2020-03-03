
class ScrollMonitor {

    constructor(output) {
        this.currentPos = window.scrollX; 
        this.currentVh = window.innerHeight / 768;

        this.scrollEvents = [];
        this.output = output;

        // Start tracking the current scroll position
        window.requestAnimationFrame(this.getCurrentPos.bind(this));

    }

    getCurrentPos() {
        // Update the current position
        const currentPos = window.scrollX;
        if (currentPos != this.currentPos) {
            this.currentPos = currentPos;

            // Handle any scroll events
            this.handleScrollEvents();

            // Output the scroll pos
            if (this.output) {
                this.output.innerHTML = this.currentPos;
            }
        }
        
        // If the browser heihgt changes size update the current VH value
        const vh = window.innerHeight / 768;
        if (vh != this.currentVh) {
            this.currentVh = vh;
            this.reCalcEventPositions();
        }

        window.requestAnimationFrame(this.getCurrentPos.bind(this));
    }

    addScrollEvent(object, distanceBefore, action) {
        const currentObjectPos = object.getBoundingClientRect().left;
        const scaledDistanceBefore = this.pxToVh(distanceBefore);

        this.scrollEvents.push({
            object, currentObjectPos, distanceBefore, scaledDistanceBefore, action
        }) 
    }

    pxToVh(px) {
        return px * this.currentVh;
    }

    reCalcEventPositions() {
        for (event of this.scrollEvents) {
            event.scaledDistanceBefore = this.pxToVh(event.distanceBefore);
        }
    }

    handleScrollEvents() {
        for (event of this.scrollEvents) {
            if (!event.hasFired && this.currentPos >= event.currentObjectPos - event.scaledDistanceBefore) {
                event.hasFired = true;
                event.action((event.currentObjectPos - this.currentPos) / window.innerHeight * 100)
            }
        }
    }
}


const scrollMonitor = new ScrollMonitor(document.getElementById('scroll-position'));
const designedHeight = 768;

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

addCircles(circles, document.getElementById('section1'));
addCircles(circles, document.getElementById('section2'));


function addCircles(circles, div) {
    circles.forEach(circleData => {
        // Creat the cirlce
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.style.left = (circleData.x * .1302) + 'vh';
        circle.style.top = (circleData.y * .1302) + 'vh';
    
        // Add it to the DOM
        div.appendChild(circle);
    
        // Add scroll events that fade the circles in 700px before
        scrollMonitor.addScrollEvent(circle, 500, () => {
            circle.classList.add('active');
        })
    })
}

const label1 = document.getElementById('label1');
scrollMonitor.addScrollEvent(label1, 700, (distanceToLeft) => {
    label1.style.position = 'fixed';
    label1.style.left = distanceToLeft + 'vh';
})

console.log(scrollMonitor.scrollEvents);




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