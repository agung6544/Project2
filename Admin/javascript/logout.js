function confirmLogout() {
    var confirmLogout = confirm("Logout?");
    if (confirmLogout) {
      window.location.href = "../index.html";
    } else {}
  }