// How many photos to delete?
// Put a number value, like this
// const maxImageCount = 5896
var maxImageCount = "ALL_PHOTOS";

// Selector for Images and buttons
var ELEMENT_SELECTORS = {
    checkboxClass: '.ckGgle',
    deleteButton: 'button[aria-label="Delete"]',
    confirmationButton: 'button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.nCP5yc.kHssdc.HvOprf'
}

// Time Configuration (in milliseconds)
var TIME_CONFIG = {
    delete_cycle: 12000,
    press_button_delay: 2000
};

var MAX_RETRIES = 10;

let imageCount = 0;

let checkboxes;
let buttons = {
    deleteButton: null,
    confirmationButton: null
}

let attemptCount = 1;
let deleteTask = setInterval(() => {

    checkboxes = document.querySelectorAll(ELEMENT_SELECTORS['checkboxClass']);

    if (checkboxes.length <= 0) {
        console.log("[INFO] No more images to delete.");
        if(attemptCount > 10) {
          console.log("[SUCCESS] Tool exited");
          clearInterval(deleteTask);
        } else {
          console.log("[INFO] skip");
          attemptCount++;
        }
        return;
    }

    attemptCount = 1;

    imageCount += checkboxes.length;

    checkboxes.forEach((checkbox) => { checkbox.click() });
    console.log("[INFO] Deleting", checkboxes.length, "images");

    setTimeout(() => {

        buttons.deleteButton = document.querySelector(ELEMENT_SELECTORS['deleteButton']);
        buttons.deleteButton.click();

        setTimeout(() => {
            buttons.confirmation_button = document.querySelector(ELEMENT_SELECTORS['confirmationButton']);
            buttons.confirmation_button.click();

            console.log(`[INFO] ${imageCount}/${maxImageCount} Deleted`);
            if (maxImageCount !== "ALL_PHOTOS" && imageCount >= parseInt(maxImageCount)) {
                console.log(`${imageCount} photos deleted as requested`);
                clearInterval(deleteTask);
                console.log("[SUCCESS] Tool exited.");
                return;
            }

        }, TIME_CONFIG['press_button_delay']);
    }, TIME_CONFIG['press_button_delay']);
}, TIME_CONFIG['delete_cycle']);
