window.addEventListener('error', function(event) {
  console.error('Global error caught:', event.error);
  document.body.innerHTML = '<div style="font-family: sans-serif; padding: 20px; color: red;"><h1>Error Loading App</h1><p>' + (event.error ? event.error.message : 'Unknown error') + '</p><pre style="background: #f0f0f0; padding: 10px; overflow-x: auto; font-size: 12px;">' + (event.error ? event.error.stack : '') + '</pre></div>';
});

window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled rejection:', event.reason);
  document.body.innerHTML = '<div style="font-family: sans-serif; padding: 20px; color: red;"><h1>Error Loading App</h1><p>' + (event.reason ? event.reason.message : 'Unhandled rejection') + '</p></div>';
});
