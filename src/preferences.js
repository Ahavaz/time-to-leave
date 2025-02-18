const { ipcRenderer } = require('electron'); 
const { getUserPreferences } = require('../js/UserPreferences.js');

// Global values for preferences page
let usersStyles =  getUserPreferences();
let preferences = {};

$(() => {
    var inputs = document.getElementsByTagName('input');
    
    $('input[type="checkbox"]').change(function() {
        preferences[this.name] = this.checked;
        ipcRenderer.send('PREFERENCE_SAVE_DATA_NEEDED', preferences);
    });

    $('input[type="time"]').change(function() {
        preferences[this.name] = this.value;
        ipcRenderer.send('PREFERENCE_SAVE_DATA_NEEDED', preferences);
    });

    $('#notification').change(function() {
        preferences['notification'] = this.value;
        ipcRenderer.send('PREFERENCE_SAVE_DATA_NEEDED', preferences);
    });

    for(var i = 0 ; i < inputs.length; i++) {
        let input = inputs[i];
        if (inputs[i].type == 'checkbox') {
            if (input.name in usersStyles) {
                input.checked = usersStyles[input.name];
            } 
            preferences[input.name] = input.checked;
        } else if (inputs[i].type == 'time') {
            if (input.name in usersStyles) {
                input.value = usersStyles[input.name];
            }
            preferences[input.name] = input.value;    
        }
    }
    let notification = 'notification';
    if (notification in usersStyles) {
        $('#' + notification).val(usersStyles[notification]);
    }
    preferences[notification] = $('#' + notification).children('option:selected').val();
});