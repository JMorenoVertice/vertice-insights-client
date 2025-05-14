export function trackMouseMovement(): () => void {
    let movementCount = 0;

    function incrementMovement() {
        movementCount++;
        console.log(`Mouse movements: ${movementCount}`);
    }

    document.addEventListener('mousemove', incrementMovement);

    // Optional: Return a cleanup function to remove the event listener
    return () => document.removeEventListener('mousemove', incrementMovement);
}
