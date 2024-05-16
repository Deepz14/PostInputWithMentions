export const Generate_Avatar_Colour = (username) => {
        // Ensure the username is a string and trim any whitespace
        username = (typeof username === 'string') ? username.trim() : '';

        if (!username) {
            return '#000000'; // Return black if no username
        }
    
        // Get the first character of the username
        var initial = username[0].toUpperCase();
    
        // Get the ASCII value of the initial letter
        var asciiValue = initial.charCodeAt(0);
    
        // Subtract 65 to get a value in the range 0-25 for A-Z
        var hue = (asciiValue - 65) * (360 / 26);
    
        // Create an HSL color with 100% saturation and 50% lightness
        var color = 'hsl(' + hue + ', 100%, 50%)';
    
        return color;
}

export const Generate_Avatar_Initial = (username) => {
    if(username){
        return username
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase();
    }
}

export const Time_Ago = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) {
        return diffInSeconds + ' seconds ago';
    } else if (diffInSeconds < 3600) {
        return Math.floor(diffInSeconds / 60) + ' minutes ago';
    } else if (diffInSeconds < 86400) {
        return Math.floor(diffInSeconds / 3600) + ' hours ago';
    } else {
        return Math.floor(diffInSeconds / 86400) + ' days ago';
    }
}