
            const input = document.getElementById('markdown-input');
            const preview = document.getElementById('html-preview');
            
            function parseMarkdown(text) {
                // Basic secure regex compiler
                let html = text
                    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
                    .replace(/^- (.*$)/gim, '<li>$1</li>')
                    .replace(/`([^`]+)`/gim, '<code>$1</code>')
                    .replace(/\n/gim, '<br>');
                
                // Wrap list items
                if (html.includes('<li>')) {
                    html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
                }
                return html;
            }

            function updatePreview() {
                preview.innerHTML = parseMarkdown(input.value);
                localStorage.setItem('markdown_cache', input.value);
            }

            input.value = localStorage.getItem('markdown_cache') || input.value;
            input.addEventListener('input', updatePreview);
            updatePreview();
        