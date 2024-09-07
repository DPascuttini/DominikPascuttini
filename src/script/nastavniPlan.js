$(function() {
    const apiBase = "https://www.fulek.com/data/api/supit";
    const token = sessionStorage.getItem("jwtToken");

    let kolegijiCache = [];

    $("#kolegijTable").hide();
    $("#autocomplete-list").hide();

    function fetchKolegiji(query = "") {
        $.ajax({
            url: `${apiBase}/curriculum-list/hr`,
            headers: {
                "Authorization": `Bearer ${token}`
            },
            method: "GET",
            success: function(data) {
                kolegijiCache = data.data;
                const filteredData = kolegijiCache.filter(item => item.kolegij.toLowerCase().includes(query.toLowerCase()));
                displaySuggestions(filteredData);
            }            
        });
    }

    function displaySuggestions(kolegiji) {
        const autocompleteList = $("#autocomplete-list");
        autocompleteList.empty();

        if (kolegiji.length > 0) {
            autocompleteList.show();
            kolegiji.forEach(kolegij => {
                autocompleteList.append(`
                    <li data-id="${kolegij.id}" data-name="${kolegij.kolegij}">
                        ${kolegij.kolegij}
                    </li>
                `);
            });
        } else {
            autocompleteList.hide();
        }
    }

    function updateTotalCounter() {
        let totalECTS = 0;
        let totalSati = 0;
        let totalPredavanja = 0;
        let totalVjezbe = 0;
    
        $("#kolegijTable tbody tr").each(function() {
            const ects = parseInt($(this).find('td:nth-child(2)').text());
            const sati = parseInt($(this).find('td:nth-child(3)').text());
            const predavanja = parseInt($(this).find('td:nth-child(4)').text());
            const vjezbe = parseInt($(this).find('td:nth-child(5)').text());
    
            totalECTS += isNaN(ects) ? 0 : ects;
            totalSati += isNaN(sati) ? 0 : sati;
            totalPredavanja += isNaN(predavanja) ? 0 : predavanja;
            totalVjezbe += isNaN(vjezbe) ? 0 : vjezbe;
        });
    
        $(".total-ects").text(totalECTS);
        $(".total-sati").text(totalSati);
        $(".total-predavanja").text(totalPredavanja);
        $(".total-vjezbe").text(totalVjezbe);
    }

    function addKolegijToTable(kolegij) {
        const tbody = $("#kolegijTable tbody");
        tbody.append(`
            <tr>
                <td>${kolegij.kolegij}</td>
                <td>${kolegij.ects}</td>
                <td>${kolegij.sati}</td>
                <td>${kolegij.predavanja}</td>
                <td>${kolegij.vjezbe}</td>
                <td>${kolegij.tip}</td>
                <td><button class="delete-btn" data-id="${kolegij.id}">Ukloni</button></td>
            </tr>
        `);
        $("#kolegijTable").show();
        updateTotalCounter();
    }

    function removeKolegij(id) {
        $(`#kolegijTable .delete-btn[data-id=${id}]`).closest('tr').remove();
        updateTotalCounter();        
    }

    $("#kolegijSearch").on("input", function() {
        const query = $(this).val();
        if (query.length > 0) {
            fetchKolegiji(query);
        } else {
            $("#autocomplete-list").hide();
        }
    });

    $("#autocomplete-list").on("click", "li", function() {
        const id = $(this).data("id");
        const kolegij = kolegijiCache.find(item => item.id === id);
        if (kolegij) {
            addKolegijToTable(kolegij);
            $("#autocomplete-list").hide();
            $("#kolegijSearch").val(""); 
        }
    });

    $("#kolegijTable").on("click", ".delete-btn", function() {
        const id = $(this).data("id");
        removeKolegij(id);
    });

    $(document).on("click", function(event) {
        if (!$(event.target).closest("#kolegijSearch, #autocomplete-list").length) {
            $("#autocomplete-list").hide();
        }
    });
});
