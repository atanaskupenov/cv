document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const terminalOutput = document.getElementById('terminal-output');

    const commands = [
        {
            command: 'ls -l /home/atanas',
            output: [
                '<span class="output">total 5</span>',
                '<span class="output">drwxr-xr-x  2 atanas  devops   4096 May 29 15:00 skills</span>',
                '<span class="output">drwxr-xr-x  2 atanas  devops   4096 May 29 15:05 projects</span>',
                '<span class="output">drwxr-xr-x  2 atanas  devops   4096 May 29 15:10 experience</span>',
                '<span class="output">drwxr-xr-x  2 atanas  devops   4096 May 29 15:15 certifications</span>',
                '<span class="output">-rw-r--r--  1 atanas  devops    512 May 29 15:16 about.txt</span>'
            ]
        },
        {
            command: 'cat ~/about.txt',
            output: [
                '<span class="output">Experienced DevOps Engineer & Cloud Architect with 6+ years of expertise in architecting, deploying, and optimizing scalable cloud infrastructure. I manage complete infrastructure lifecycles while specializing in automation solutions that eliminate repetitive tasks and empower teams to focus on high-impact strategic work.Passionate about automation, infrastructure as code, and scalable cloud solutions, I currently specialize in public and private cloud automation, architecting and designing solutions that adhere to industry best practices while leveraging cutting-edge technologies. I enthusiastically embrace AI as a powerful ally, utilizing it to streamline development workflows, drive product innovation, and accelerate continuous learning.A dedicated tinkerer at heart, I maintain an extensive homelab where I continuously experiment with emerging technologies, test new hardware configurations, validate architectural concepts or just 3D print some useful gadgets.</span>'
            ]
        }
    ];

    let commandIndex = 0;

    function typeCommand(command, callback) {
        let i = 0;
        const prompt = '<span class="prompt">root@devops:~#</span> ';
        const commandElement = document.createElement('div');
        commandElement.classList.add('command-line');
        commandElement.innerHTML = prompt;
        terminalOutput.appendChild(commandElement);

        const interval = setInterval(() => {
            if (i < command.length) {
                commandElement.innerHTML += command.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 50);
    }

    function displayOutput(outputLines, callback) {
        let lineIndex = 0;
        
        function nextLine() {
            if (lineIndex < outputLines.length) {
                const outputElement = document.createElement('div');
                outputElement.classList.add('command-line');
                outputElement.innerHTML = outputLines[lineIndex];
                terminalOutput.appendChild(outputElement);
                lineIndex++;
                setTimeout(nextLine, 100);
            } else {
                if (callback) callback();
            }
        }
        
        nextLine();
    }

    function runCommands() {
        if (commandIndex < commands.length) {
            const { command, output } = commands[commandIndex];
            typeCommand(command, () => {
                displayOutput(output, () => {
                    commandIndex++;
                    setTimeout(runCommands, 500);
                });
            });
        }
    }

    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                if (terminalOutput) {
                    runCommands();
                }
            }, 500); 
        }, 3000);
    } else {
        if (terminalOutput) {
            runCommands();
        }
    }

    // Animate timeline on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Scroll to section
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
});