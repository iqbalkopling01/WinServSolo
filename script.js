document.addEventListener("DOMContentLoaded", function() {
    checkUserAccess();
    showSection('keuangan');
});

function checkUserAccess() {
    // Call server-side function to get user groups and adjust UI accordingly
    fetch('/api/getUserGroups')
        .then(response => response.json())
        .then(data => {
            if (!data.includes('GrupKeuangan')) {
                document.getElementById('keuangan').style.display = 'none';
                document.querySelector('button[onclick="showSection(\'keuangan\')"]').style.display = 'none';
            }
            if (!data.includes('GrupLogistik')) {
                document.getElementById('logistik').style.display = 'none';
                document.querySelector('button[onclick="showSection(\'logistik\')"]').style.display = 'none';
            }
            if (!data.includes('GrupPenjualan')) {
                document.getElementById('penjualan').style.display = 'none';
                document.querySelector('button[onclick="showSection(\'penjualan\')"]').style.display = 'none';
            }
        });
}

function showSection(section) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(section).style.display = 'block';
}

function addKeuangan() {
    let tanggal = document.getElementById('tanggalKeuangan').value;
    let keperluan = document.getElementById('keperluan').value;
    let jumlah = document.getElementById('jumlahKeuangan').value;
    let debit = document.getElementById('debit').value;
    let kredit = document.getElementById('kredit').value;

    let table = document.getElementById('keuanganTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    newRow.insertCell(0).innerText = tanggal;
    newRow.insertCell(1).innerText = keperluan;
    newRow.insertCell(2).innerText = jumlah;
    newRow.insertCell(3).innerText = debit;
    newRow.insertCell(4).innerText = kredit;

    clearForm('keuanganForm');
}

function addLogistik() {
    let namaItem = document.getElementById('namaItem').value;
    let stok = document.getElementById('stok').value;
    let masuk = document.getElementById('masuk').value;
    let keluar = document.getElementById('keluar').value;

    let table = document.getElementById('logistikTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    newRow.insertCell(0).innerText = namaItem;
    newRow.insertCell(1).innerText = stok;
    newRow.insertCell(2).innerText = masuk;
    newRow.insertCell(3).innerText = keluar;

    clearForm('logistikForm');
}

function addPenjualan() {
    let tanggal = document.getElementById('tanggalPenjualan').value;
    let namaItem = document.getElementById('namaItemPenjualan').value;
    let tujuan = document.getElementById('tujuan').value;
    let jumlahPenjualan = document.getElementById('jumlahPenjualan').value;
    let keterangan = document.getElementById('keterangan').value;

    let table = document.getElementById('penjualanTable').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    newRow.insertCell(0).innerText = tanggal;
    newRow.insertCell(1).innerText = namaItem;
    newRow.insertCell(2).innerText = tujuan;
    newRow.insertCell(3).innerText = jumlahPenjualan;
    newRow.insertCell(4).innerText = keterangan;

    clearForm('penjualanForm');
}

function clearForm(formId) {
    document.getElementById(formId).reset();
}

function exportKeuangan() {
    exportToExcel('keuanganTable', 'Keuangan_' + new Date().toISOString().split('T')[0]);
}

function exportLogistik() {
    exportToExcel('logistikTable', 'Logistik_' + new Date().toISOString().split('T')[0]);
}

function exportPenjualan() {
    exportToExcel('penjualanTable', 'Penjualan_' + new Date().toISOString().split('T')[0]);
}

function exportToExcel(tableId, fileName) {
    let table = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(wb, fileName + '.xlsx');
}
