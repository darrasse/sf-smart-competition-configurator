const form = document.getElementById('parameters');
form.addEventListener('submit', process);

function process(event) {
    event.preventDefault();

    const data = new FormData(form);
    const output = document.getElementById('output');
    switch (data.get('modus')) {
        case '1':
            modus1(data.get('participants'), output);
            break;
        case '2':
            modus2(data.get('participants'), output);
            break;
        case '3':
            modus3(data.get('participants'), output);
            break;
    }
}

function modus1(participants, output) {
    if (participants > 10) {
        output.innerHTML = `
            <div>Too many participants for modus 1, please choose modus 2 or 3.</div>
        `
        return;
    }
    const touches = participants <= 8 ? 5 : 4;
    output.innerHTML = `
        <div>Single pool of ${participants}. Bouts to ${touches} touches.</div>
    `
}

function modus2(participants, output) {
    const full_pools = Math.floor(participants / 5);
    const remainder = participants % 5;
    if (remainder == 0) {
        output.innerHTML = `
            <h2>First round</h2>
            <div>${full_pools} pools of 5. Bouts to 5 touches.</div>
            <h2>Second round</h2>
            <div>${full_pools} pools of 5, using the rankings from the first round. Ranks 1-5 go to the pool 1, 6-10 to pool 2, etc. Bouts to 5 touches.</div>
            <h2>Third round</h2>
            <div>${full_pools} pools of 5, using the accumulated rankings from the first and second round. Ranks 1-5 go to the pool 1, 6-10 to pool 2, etc. Bouts to 5 touches.</div>
        `
    } else if (remainder == 1) {
        output.innerHTML = `
            <h2>First round</h2>
            <div>${full_pools - 1} pools of 5, 1 pool of 6. Bouts to 5 touches.</div>
            <h2>Second round</h2>
            <div>1 pool of 6, ${full_pools - 1} pools of 5, using the rankings from the first round. Ranks 1-6 go to the pool 1, 7-11 to pool 2, etc. Bouts to 5 touches.</div>
            <h2>Third round</h2>
            <div>1 pool of 6, ${full_pools - 1} pools of 5, using the accumulated rankings from the first and second round. Ranks 1-6 go to the pool 1, 7-11 to pool 2, etc. Bouts to 5 touches.</div>
        `
    } else if (remainder == 2) {
        output.innerHTML = `
            <h2>First round</h2>
            <div>${full_pools - 2} pools of 5, 2 pools of 6. Bouts to 5 touches.</div>
            <h2>Second round</h2>
            <div>2 pools of 6, ${full_pools - 2} pools of 5, using the rankings from the first round. Ranks 1-6 go to the pool 1, 7-12 to pool 2, etc. Bouts to 5 touches.</div>
            <h2>Third round</h2>
            <div>2 pools of 6, ${full_pools - 2} pools of 5, using the accumulated rankings from the first and second round. Ranks 1-6 go to the pool 1, 7-12 to pool 2, etc. Bouts to 5 touches.</div>
        `
    } else if (remainder == 3) {
        output.innerHTML = `
            <h2>First round</h2>
            <div>${full_pools - 1} pools of 5, 2 pools of 4. Bouts to 5 touches.</div>
            <h2>Second round</h2>
            <div>${full_pools - 1} pools of 5, 2 pools of 4 using the rankings from the first round. Ranks 1-5 go to the pool 1, 6-10 to pool 2, etc. Bouts to 5 touches.</div>
            <h2>Third round</h2>
            <div>${full_pools - 1} pools of 5, 2 pools of 4 using the accumulated rankings from the first and second round. Ranks 1-5 go to the pool 1, 6-10 to pool 2, etc. Bouts to 5 touches.</div>
        `
    } else if (remainder == 4) {
        output.innerHTML = `
            <h2>First round</h2>
            <div>${full_pools} pools of 5, 1 pool of 4. Bouts to 5 touches.</div>
            <h2>Second round</h2>
            <div>${full_pools} pools of 5, 1 pool of 4 using the rankings from the first round. Ranks 1-5 go to the pool 1, 6-10 to pool 2, etc. Bouts to 5 touches.</div>
            <h2>Third round</h2>
            <div>${full_pools} pools of 5, 1 pool of 4 using the accumulated rankings from the first and second round. Ranks 1-5 go to the pool 1, 6-10 to pool 2, etc. Bouts to 5 touches.</div>
        `
    }
}

function modus3(participants, output) {
    if (participants < 12) {
        output.innerHTML = `
            <div>Too few participants for modus 3, please choose modus 1 or 2.</div>
        `
        return;
    }
    const full_pools = Math.floor(participants / 5);
    const remainder = participants % 5;
    if (remainder == 0) {
        output.innerHTML = `
            <h2>First round</h2>
            <div>${full_pools} pools of 5. Bouts to 5 touches.</div>
        `
    } else if (remainder == 1) {
        output.innerHTML = `
            <h2>First round</h2>
            <div>${full_pools - 1} pools of 5, 1 pool of 6. Bouts to 5 touches.</div>
        `
    } else if (remainder == 2) {
        output.innerHTML = `
            <h2>First round</h2>
            <div>${full_pools - 2} pools of 5, 2 pools of 6. Bouts to 5 touches.</div>
        `
    } else if (remainder == 3) {
        output.innerHTML = `
            <h2>First round</h2>
            <div>${full_pools - 1} pools of 5, 2 pools of 4. Bouts to 5 touches.</div>
        `
    } else if (remainder == 4) {
        output.innerHTML = `
            <h2>First round</h2>
            <div>${full_pools} pools of 5, 1 pool of 4. Bouts to 5 touches.</div>
        `
    }
    const full_tableaux = Math.floor(participants / 8);
    const tableau_remainder = participants % 8;
    if (tableau_remainder == 0) {
        output.innerHTML += `
            <h2>Second round</h2>
            <div>${full_tableaux} full tableau of 8 using the ranks from the first round.
            Ranks 1-8 go to tableau 1, 9-16 to tableau 2, etc. Bouts to 5 touches.</div>
        `
    } else {
        output.innerHTML += `
            <h2>Second round</h2>
            <div>${full_tableaux} full tableau of 8 and an incomplete 8 tableau with ${tableau_remainder},
            using the ranks from the first round. Ranks 1-8 go to tableau 1, 9-16 to tableau 2, etc.
            Bouts to 5 touches.</div>
        `
    }
}