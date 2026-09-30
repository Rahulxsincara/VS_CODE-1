document.addEventListener('DOMContentLoaded', () => {
    // Theme switching functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeDropdown = document.getElementById('themeDropdown');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Toggle theme dropdown
    themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        themeDropdown.classList.toggle('active');
        
        // Add animation effect
        if (themeDropdown.classList.contains('active')) {
            themeDropdown.style.animation = 'bounceIn 0.3s ease';
        }
    });
    
    // Close dropdown when clicking elsewhere
    document.addEventListener('click', (e) => {
        if (!themeToggle.contains(e.target) && !themeDropdown.contains(e.target)) {
            themeDropdown.classList.remove('active');
        }
    });
    
    // Apply selected theme
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeDropdown.classList.remove('active');
            
            // Add ripple effect
            createRippleEffect(option);
        });
    });

    // Year selection functionality
    let selectedYear = null;
    const landingPage = document.getElementById('landing-page');
    const yearPages = document.querySelectorAll('.year-page');
    const yearOptions = document.querySelectorAll('.year-option');
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const backButtons = document.querySelectorAll('.back-button');

    // --- Page Navigation and Year Selection ---

    yearOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove 'selected' from all
            yearOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add 'selected' to clicked option
            option.classList.add('selected');
            selectedYear = option.getAttribute('data-year');
            confirmBtn.disabled = false;
            
            // Add animation effect
            option.style.animation = 'pulseGrow 0.3s ease';
            setTimeout(() => {
                option.style.animation = '';
            }, 300);
        });
    });

    confirmBtn.addEventListener('click', () => {
        if (selectedYear) {
            // Hide all pages
            landingPage.style.display = 'none';
            yearPages.forEach(page => page.style.display = 'none');
            
            // Show the selected year page
            const targetPageId = `year-${selectedYear}-page`;
            const targetPage = document.getElementById(targetPageId);
            if (targetPage) {
                targetPage.style.display = 'block';
                // Reset semester selection for the new page
                resetSemesterSelection(targetPage, selectedYear);
                
                // Add entrance animation
                targetPage.style.opacity = '0';
                targetPage.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    targetPage.style.transition = 'all 0.5s ease';
                    targetPage.style.opacity = '1';
                    targetPage.style.transform = 'translateY(0)';
                }, 10);
            }
        } else {
            alert('Please select an academic year first.');
        }
    });
    
    cancelBtn.addEventListener('click', () => {
        // Clear selection
        yearOptions.forEach(opt => opt.classList.remove('selected'));
        selectedYear = null;
        
        // Add animation effect
        cancelBtn.style.animation = 'pulseGrow 0.3s ease';
        setTimeout(() => {
            cancelBtn.style.animation = '';
        }, 300);
    });

    backButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Hide all pages
            yearPages.forEach(page => page.style.display = 'none');
            // Show landing page
            landingPage.style.display = 'block';
            
            // Add entrance animation
            landingPage.style.opacity = '0';
            landingPage.style.transform = 'translateY(20px)';
            setTimeout(() => {
                landingPage.style.transition = 'all 0.5s ease';
                landingPage.style.opacity = '1';
                landingPage.style.transform = 'translateY(0)';
            }, 10);
        });
    });

    // --- Semester Selection Logic ---
    
    function resetSemesterSelection(page, year) {
        const semesterOptions = page.querySelectorAll('.semester-option');
        
        // Ensure the first semester is selected and displayed by default
        semesterOptions.forEach((opt, index) => {
            opt.classList.remove('selected');
            const semesterId = opt.getAttribute('data-semester');
            const contentId = `year-${year}-semester-${semesterId}-content`;
            const content = page.querySelector(`#${contentId}`);

            if (index === 0) {
                opt.classList.add('selected');
                if (content) content.style.display = 'block';
            } else {
                 if (content) content.style.display = 'none';
            }
        });
    }

    yearPages.forEach(page => {
        const year = page.id.split('-')[1];
        const semesterOptions = page.querySelectorAll('.semester-option');
        semesterOptions.forEach(option => {
            option.addEventListener('click', () => {
                const semester = option.getAttribute('data-semester');
                const contentId = `year-${year}-semester-${semester}-content`;
                
                // Remove 'selected' from all options on this page
                semesterOptions.forEach(opt => opt.classList.remove('selected'));
                // Add 'selected' to the clicked option
                option.classList.add('selected');
                
                // Hide all semester content and show the selected one
                page.querySelectorAll('.semester-content').forEach(content => {
                    content.style.display = 'none';
                });
                const targetContent = page.querySelector(`#${contentId}`);
                if (targetContent) {
                    targetContent.style.display = 'block';
                    
                    // Add animation effect
                    targetContent.style.opacity = '0';
                    targetContent.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        targetContent.style.transition = 'all 0.3s ease';
                        targetContent.style.opacity = '1';
                        targetContent.style.transform = 'translateY(0)';
                    }, 10);
                }
                
                // Add animation effect to the clicked option
                option.style.animation = 'pulseGrow 0.3s ease';
                setTimeout(() => {
                    option.style.animation = '';
                }, 300);
            });
        });
    });

    // --- Upload File Functionality (Mock) ---
    document.querySelectorAll('.upload-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add animation effect
            button.style.animation = 'pulseGrow 0.3s ease';
            setTimeout(() => {
                button.style.animation = '';
            }, 300);
            
            // 1. Create a hidden file input element
            let fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '*/*'; // Allows any file type
            
            // Find the course name for better feedback
            const courseName = button.closest('.course-item').querySelector('.course-name').textContent;

            // 2. Attach a listener to handle the file selection
            fileInput.onchange = (event) => {
                const file = event.target.files[0];
                if (file) {
                    // MOCK ALERT - In a real app, this is where you'd upload via AJAX/fetch
                    alert(`✅ Preparing to upload "${file.name}" to the resources for ${courseName}. (Server logic required)`);
                }
            };

            // 3. Programmatically click the hidden input to open the file selection dialog
            fileInput.click();
        });
    });

    // --- View Resources Functionality ---
    document.querySelectorAll('.course-btn.primary').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Add animation effect
            button.style.animation = 'pulseGrow 0.3s ease';
            setTimeout(() => {
                button.style.animation = '';
            }, 300);
            
            // Get the course code from the course item
            const courseItem = button.closest('.course-item');
            const courseCode = courseItem.querySelector('.course-code').textContent;
            
            // Get course resources from database
            try {
                const resources = CourseDatabase.getCourseResources(courseCode);
                if (resources && resources.length > 0) {
                    // Create a modal to display file options
                    createFileViewerModal(resources, courseCode);
                } else {
                    alert("No files available for this course.");
                }
            } catch (error) {
                console.error("Error retrieving course resources:", error);
                alert("Error retrieving course resources. Please try again.");
            }
        });
    });

    // Function to create a file viewer modal
    function createFileViewerModal(resources, courseCode) {
        // Remove any existing modals
        const existingModal = document.querySelector('.file-viewer-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Group resources by folder structure
        const groupedResources = groupResourcesByFolder(resources);
        
        // Create modal container
        const modal = document.createElement('div');
        modal.className = 'file-viewer-modal';
        modal.innerHTML = `
            <div class="file-viewer-content">
                <div class="file-viewer-header">
                    <h2>Files for ${courseCode}</h2>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="file-list">
                    ${renderResourceGroups(groupedResources)}
                </div>
            </div>
        `;
        
        // Add modal to document
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Add event listeners to view buttons
        modal.querySelectorAll('.view-file-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const fileItem = e.target.closest('.file-item');
                const filePath = fileItem.getAttribute('data-path');
                const fileName = fileItem.getAttribute('data-name');
                
                // Try to view the file first
                viewFile(filePath, fileName);
            });
        });
        
        // Add event listeners to download buttons
        modal.querySelectorAll('.download-file-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const fileItem = e.target.closest('.file-item');
                const filePath = fileItem.getAttribute('data-path');
                const fileName = fileItem.getAttribute('data-name');
                
                downloadFile(filePath, fileName);
            });
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // Function to download a file
    function downloadFile(filePath, fileName) {
        // Create a temporary link for download
        const link = document.createElement('a');
        link.href = filePath;
        link.download = fileName || filePath.split('/').pop() || 'download';
        
        // For Edge and other browsers, we need to handle this differently
        // Try to trigger download programmatically
        document.body.appendChild(link);
        
        // Use setTimeout to ensure the link is added to DOM before clicking
        setTimeout(() => {
            link.click();
            document.body.removeChild(link);
        }, 100);
    }
    
    // Function to group resources by folder structure
    function groupResourcesByFolder(resources) {
        const grouped = {};
        const rootFiles = [];
        
        resources.forEach(resource => {
            const pathParts = resource.name.split('/');
            if (pathParts.length > 1) {
                // This is a nested file
                const folder = pathParts[0];
                if (!grouped[folder]) {
                    grouped[folder] = [];
                }
                grouped[folder].push({
                    ...resource,
                    displayName: pathParts.slice(1).join('/')
                });
            } else {
                // This is a root level file
                rootFiles.push(resource);
            }
        });
        
        return {
            rootFiles,
            folders: grouped
        };
    }
    
    // Function to render resource groups
    function renderResourceGroups(groupedResources) {
        let html = '';
        
        // Render root files
        if (groupedResources.rootFiles.length > 0) {
            html += `<div class="folder-section">`;
            html += `<h3>Files</h3>`;
            html += groupedResources.rootFiles.map(resource => `
                <div class="file-item" data-path="${resource.path}" data-name="${resource.name}">
                    <i class="fas fa-file"></i>
                    <span class="file-name">${resource.name}</span>
                    <button class="download-file-btn">Download</button>
                </div>
            `).join('');
            html += `</div>`;
        }
        
        // Render folders
        for (const [folderName, files] of Object.entries(groupedResources.folders)) {
            html += `<div class="folder-section">`;
            html += `<h3><i class="fas fa-folder"></i> ${folderName}</h3>`;
            html += files.map(resource => `
                <div class="file-item" data-path="${resource.path}" data-name="${resource.name}">
                    <i class="fas fa-file"></i>
                    <span class="file-name">${resource.displayName}</span>
                    <button class="download-file-btn">Download</button>
                </div>
            `).join('');
            html += `</div>`;
        }
        
        return html;
    }
    
    // Function to show folder contents (kept for backward compatibility)
    function showFolderContents(folderPath, folderName, courseCode) {
        // Remove any existing modals
        const existingModal = document.querySelector('.file-viewer-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create a simple modal to show that folder contents would be displayed
        // In a full implementation, you would read the folder contents and display them
        const modal = document.createElement('div');
        modal.className = 'file-viewer-modal';
        modal.innerHTML = `
            <div class="file-viewer-content">
                <div class="file-viewer-header">
                    <h2>${folderName} (Folder)</h2>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="file-list">
                    <p>Folder path: ${folderPath}</p>
                    <p>In a full implementation, this would show the contents of the folder.</p>
                    <p>Folder contents would be listed here with options to view individual files.</p>
                    <button id="back-to-resources" class="view-file-btn" style="margin-top: 20px;">Back to ${courseCode} Resources</button>
                </div>
            </div>
        `;
        
        // Add modal to document
        document.body.appendChild(modal);
        
        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Add event listener for back button
        modal.querySelector('#back-to-resources').addEventListener('click', () => {
            // Re-show the original resources modal
            const resources = CourseDatabase.getCourseResources(courseCode);
            createFileViewerModal(resources, courseCode);
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // Initialize semester selection for all year pages
    yearPages.forEach(page => {
        const year = page.id.split('-')[1];
        resetSemesterSelection(page, year);
    });
    
    // Ripple effect function
    function createRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Add scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .stat-item, .course-item, .semester-option');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // Trigger on load
    animateOnScroll();
});