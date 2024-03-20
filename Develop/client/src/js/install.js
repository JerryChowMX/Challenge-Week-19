const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Update UI to notify the user they can add to home screen
  butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  // Show the install prompt
  promptEvent.prompt();
  // Clear the deferred prompt so it can only be used once
  window.deferredPrompt = null;
  // Hide the install button after the prompt is shown
  butInstall.classList.toggle('hidden', true);
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Clear the deferred prompt since the app was installed
  window.deferredPrompt = null;
});
