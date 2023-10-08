document.addEventListener("DOMContentLoaded", function () {
    const temperatureInput = document.getElementById("temperature");
    const unitSelect = document.getElementById("unit");
    const convertButton = document.getElementById("convert");
    const resultParagraph = document.getElementById("result");
    const historyList = document.getElementById("history");

    const history = [];

    convertButton.addEventListener("click", function () {
        const temperature = parseFloat(temperatureInput.value);
        const unit = unitSelect.value;
        let convertedTemperature, originalUnit, targetUnit, conversionType;

        if (!isNaN(temperature)) {
            if (unit === "celsius") {
                convertedTemperature = (temperature * 9/5) + 32;
                originalUnit = "Celsius";
                targetUnit = "Fahrenheit";
                conversionType = "C to F";
            } else {
                convertedTemperature = (temperature - 32) * 5/9;
                originalUnit = "Fahrenheit";
                targetUnit = "Celsius";
                conversionType = "F to C";
            }

            resultParagraph.textContent = `${temperature}°${originalUnit} is equal to ${convertedTemperature.toFixed(2)}°${targetUnit}`;

            // Store the conversion in the history
            history.unshift({
                temperature,
                originalUnit,
                targetUnit,
                convertedTemperature,
                conversionType,
                timestamp: new Date().toLocaleString()
            });

            // Update the history list
            updateHistoryList();
        } else {
            resultParagraph.textContent = "Please enter a valid temperature.";
        }
    });

    function updateHistoryList() {
        historyList.innerHTML = "";
        history.forEach(entry => {
            const listItem = document.createElement("li");
            listItem.textContent = `${entry.temperature}°${entry.originalUnit} ${entry.conversionType} => ${entry.convertedTemperature.toFixed(2)}°${entry.targetUnit} (${entry.timestamp})`;
            historyList.appendChild(listItem);
        });
    }
});
