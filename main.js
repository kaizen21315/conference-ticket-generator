// Get drag and drop elements 
const avatarInput = document.getElementById('avatar');
const avatarDropzone = document.querySelector('.avatar-dropzone');
const avatarPreview = document.getElementById('avatarPreview');
const avatarButtons = document.getElementById('avatarButtons');
const dragMessage = document.querySelector('.drag');
const infosSvg = document.querySelector('.upload-hint svg path');
const form =document.querySelector("form");
const nameinput = document.querySelector('.name input');
const userName = document.getElementById("userName");
const userNameTicket = document.getElementById("userNameTicket");
const emailInput = document.querySelector(".email input");
const userEmail = document.getElementById("userEmail");
const userGithub = document.querySelector(".githubUserName p")
const githubInput = document.getElementById("github");
const randomRandomNumber = document.querySelector("#randomNumber")
const nameError = document.querySelector(".nameError");
const emailError = document.querySelector(".emailError");
const githubError = document.querySelector(".githubError");

let uploadedImage = null;

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    avatarDropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

// Visual feedback when dragging over
['dragenter', 'dragover'].forEach(eventName => {
    avatarDropzone.addEventListener(eventName, () => {
        avatarDropzone.style.borderColor = '#F57463';
        avatarDropzone.style.backgroundColor = 'rgba(245, 116, 99, 0.05)';
    });
});

['dragleave', 'drop'].forEach(eventName => {
    avatarDropzone.addEventListener(eventName, () => {
        avatarDropzone.style.borderColor = '';
        avatarDropzone.style.backgroundColor = '';
    });
});

// Handle dropped files
avatarDropzone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    
    if (files.length > 0) {
        handleImageUpload(files[0]);
    }
});

// Handle file input change (click to browse)
avatarInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleImageUpload(e.target.files[0]);
    }
});

// Handle image upload
function handleImageUpload(file) {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
        dragMessage.textContent = 'Please upload an image file (JPG or PNG)';
        infosSvg.style.stroke = "hsl(7, 86%, 67%)";
        return;
    }

    // Check file size (max 1MB)
    if (file.size > 1000000) {
        dragMessage.textContent = 'File size must be less than 1MB';
        dragMessage.style.color="hsl(7, 86%, 67%)";
        infosSvg.style.stroke = "hsl(7, 86%, 67%)";
        return;
    }

        if (file.size <= 1000000) {
        dragMessage.textContent = 'Upload your photo (JPG or PNG, max size: 1MB).';
        dragMessage.style.color="green";
        infosSvg.style.stroke = "green";
    }



    // Read and display the image
    const reader = new FileReader();
    
    reader.onload = (e) => {
        uploadedImage = e.target.result;
        
        // Update preview
        avatarPreview.innerHTML = `<img src="${e.target.result}" alt="Avatar preview" style="width: 3rem; height: 3rem; object-fit: cover; border-radius: 8px; margin-bottom: 0.5rem;">`;
        
        // Show buttons
        avatarButtons.classList.remove('hidden');
        avatarButtons.classList.add('flex')
    };
    
// Remove image button
const removeImageBtn = document.getElementById('removeImage');

removeImageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Reset everything
    uploadedImage = null;
    avatarInput.value = '';
    infosSvg.style.stroke = "#D1D0D5";

    // Restore original preview
    avatarPreview.innerHTML = `
        <img src="./assets/images/icon-upload.svg" alt="upload icon" loading="lazy" class="upload-icon">
        <p class="dragmessage">Drag and drop or click to upload</p>
    `;
    
    // Hide buttons
    avatarButtons.classList.add('hidden');
    avatarButtons.classList.remove('flex')
    
    // Reset error message if you have one
    if (dragMessage) {
        dragMessage.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';
        dragMessage.style.color = '';
    }
});

    reader.readAsDataURL(file);
}

nameinput.addEventListener('input', () => {
    if (nameinput.value.trim() !== "") {
        nameError.textContent = "";
    }

});

emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() !== "") {
        emailError.textContent = "";
    }

});

githubInput.addEventListener('input', () => {
    if (githubInput.value.trim() !== "") {
        githubError.textContent = "";
    }

});

form.addEventListener("submit", (e) =>{

    // Get current date
    const today = new Date();

    // Format: "Jan 31, 2026"
    const formattedDate = today.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });

    document.getElementById('date').textContent = formattedDate;

    //name valiation
    e.preventDefault();

    
    if (uploadedImage === null) {
        dragMessage.textContent = 'Please upload an image file (JPG or PNG)';
        dragMessage.style.color="hsl(7, 86%, 67%)";
        infosSvg.style.stroke = "hsl(7, 86%, 67%)";
        return;
    }

    let nameValue = nameinput.value;
    userName.textContent = nameValue;

    if (nameValue.trim()=== "") {
        nameError.textContent = "Name is required";
        return
    }

    // email validation

    let emailValue =  emailInput.value.trim();
    userEmail.textContent = emailValue;

    if (emailValue.trim()=== "") {
        emailError.textContent = "Email is required";
        
        return
    }

// Add to your form submit
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



if (!isValidEmail(emailValue)) {
    emailError.textContent = "Please enter a valid email address";
    emailInput.focus();
    return;
}
    
    userNameTicket.textContent = nameValue;
        if (uploadedImage) {
        const userImage = document.querySelector('.userImage');
        userImage.innerHTML = `<img src="${uploadedImage}" alt="User avatar" style="width: 2rem; height: 2rem; object-fit: cover;border-radius: 8px;">`;
    }
// github validation
    let githubValue = githubInput.value.trim();
    if (githubValue.startsWith('@')) {
    userGithub.textContent = githubValue;
    } else {
    userGithub.textContent = `@${githubValue}`;
    }

    if (githubValue.trim()=== "") {
        githubError.textContent = "GitHub username is required";
        return
    }
    

    // Generate random number between 10000 and 99999
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    randomRandomNumber.textContent = `#${randomNumber}`;

    document.getElementById('formSection').style.display = 'none';
    document.getElementById('ticketSection').style.display = 'block';

});

