function encryptName() {
    const nameInput = document.getElementById("input");
    const encryptionTypeSelect = document.getElementById("choose_code");
    const encryptedNameOutput = document.getElementById("output");

    const arabicAlphabet = {
        'ا': 1, 'ب': 2, 'ت': 3, 'ث': 4, 'ج': 5, 'ح': 6, 'خ': 7, 'د': 8, 'ذ': 9, 'ر': 10,
        'ز': 11, 'س': 12, 'ش': 13, 'ص': 14, 'ض': 15, 'ط': 16, 'ظ': 17, 'ع': 18, 'غ': 19, 'ف': 20,
        'ق': 21, 'ك': 22, 'ل': 23, 'م': 24, 'ن': 25, 'ه': 26, 'و': 27, 'ي': 28, 'ء': 'ا', 'ة': 'ه', ' ': '/'
    };

    const name = nameInput.value;
    const encryptionType = encryptionTypeSelect.value;

    let encryptedName = "";

    if (encryptionType === "1") {
        // Encrypt to numbers
        for (let i = 0; i < name.length; i++) {
            let char = name[i].toLowerCase();
            // Handle special cases for "ء" and "ة"
            if (char === 'ء') {
                char = 'ا';
            } else if (char === 'ة') {
                char = 'ه';
            }
            if (arabicAlphabet[char]) {
                encryptedName += arabicAlphabet[char] + '-';
            } else {
                encryptedName += char + '-';
            }
        }
        encryptedName = encryptedName.slice(0, -1); // Remove trailing '-'
    } else if (encryptionType === "2") {
        // Encrypt using sections (not modified)
        const sections = {
            section1: ['ا', 'ب', 'ت'],
            section2: ['ث', 'ج', 'ح'],
            section3: ['خ', 'د', 'ذ'],
            section4: ['ر', 'ز', 'س'],
            section5: ['ش', 'ص', 'ض'],
            section6: ['ط', 'ظ', 'ع'],
            section7: ['غ', 'ف', 'ق'],
            section8: ['ك', 'ل', 'م'],
            section9: ['ن', 'ه', 'و'],
            section10: ['ي'],
        };

        const generateShape = (section, index) => {
            switch (section) {
                case 'section1':
                    return `|__${index + 1}\n****`;
                case 'section2':
                    return `${index + 1}\n|__| \n****\n`;
                case 'section3':
                    return `${index + 1}__| \n****\n`;
                case 'section4':
                    return `----\n| ${index + 1}\n---- \n****\n`;
                case 'section5':
                    return `----\n| ${index + 1} |\n---- \n****\n`;
                case 'section6':
                    return `----\n${index + 1} |\n---- \n****\n`;
                case 'section7':
                    return ` ----\n| ${index + 1} \n****\n`;
                case 'section8':
                    return `----\n| ${index + 1} | \n****\n`;
                case 'section9':
                    return `----\n${index + 1}  | \n****\n`;
                case 'section10':
                    return `/\\\n--\n****`;
                default:
                    return '';
            }
        };

        encryptedName = encryptUsingSections(name, sections, generateShape);
    } else if (encryptionType === "3") {
        // Reverse name
        const reversedName = name.split('').reverse().join('');
        encryptedName = reversedName;
    }

    encryptedNameOutput.textContent = "Encrypted name: \n" + encryptedName;
}

function encryptUsingSections(name, sections, generateShape) {
    let encryptedName = '';
    for (let i = 0; i < name.length; i++) {
        let found = false;
        let char = name[i];
        
        // Handle special cases for "ء" and "ة"
        if (char === 'ء') {
            char = 'ا';
        } else if (char === 'ة') {
            char = 'ه';
        }
        
        for (const section in sections) {
            if (sections[section].includes(char)) {
                const index = sections[section].indexOf(char);
                const shape = generateShape(section, index);
                encryptedName += shape + '\n';
                found = true;
                break;
            }
        }
        if (!found) {
            encryptedName += char + '\n';
        }
    }
    return encryptedName;
}