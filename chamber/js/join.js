    // Function to set the current timestamp
        function setTimestamp() {
            const timestampField = document.getElementById('timestamp');
            if (timestampField) {
                timestampField.value = new Date().toISOString();
            }
        }

        // Function to open a modal
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        }

        // Function to close a modal
        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.close();
            }
        }

        // Call setTimestamp when the page loads
        window.onload = function() {
            setTimestamp();
        };