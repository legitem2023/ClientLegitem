'use client';
export const triggerCancel = () => {
    (document.getElementById("username") as HTMLInputElement).value = "";
    (document.getElementById("password") as HTMLInputElement).value = "";
    (document.getElementById("ErrorHandling") as HTMLDivElement).innerHTML = "";
    (document.getElementById("username") as HTMLInputElement).focus();
}
