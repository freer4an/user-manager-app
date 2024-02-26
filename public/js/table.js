const block_btn = document.getElementById("btn-block");
const unblock_btn = document.getElementById("btn-unblock");
const delete_btn = document.getElementById("btn-delete");
const toggleCheckboxButton = document.getElementById("toggleCheckbox");
const logout = document.getElementById("logout");
deselectAll()

logout.addEventListener('click', () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login"
})

function getChecked() {
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    return  checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
}

function tableRequest(endpoint, method, ids) {
    sendRequest(`/users/${endpoint}`, method, {ids: ids})
        .then(res => {
            if (res.status === 200) {
                window.location.reload();
            } else {
                console.log(res.statusText)
            }
        })
        .catch(err => console.log(err))
}
block_btn.addEventListener('click', () => {
    const checked = getChecked()
    if (checked.length === 0) {
        return;
    }
    tableRequest("block", "PATCH", checked)
})

unblock_btn.addEventListener('click', () => {
    const checked = getChecked()
    if (checked.length === 0) {
        return;
    }
    tableRequest("unblock", "PATCH", checked)
})

delete_btn.addEventListener('click', () => {
    const checked = getChecked()
    if (checked.length === 0) {
        return;
    }
    tableRequest("delete", "DELETE", checked)
})

function selectAll() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = true;
    });
}

function deselectAll() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
}

toggleCheckboxButton.addEventListener("click", function() {
    if (toggleCheckboxButton.textContent === "☐") {
        toggleCheckboxButton.textContent = "☑";
        selectAll();
    } else {
        toggleCheckboxButton.textContent = "☐";
        deselectAll();
    }
});

