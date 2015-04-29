Template.vexflow.rendered = function() {
    var svg = $('svg')[0];
    var renderer = new Vex.Flow.Renderer(svg, Vex.Flow.Renderer.Backends.SVG);
    var ctx = renderer.getContext();
    var treble = new Vex.Flow.Stave(10, 0, 80).addClef('treble').setContext(ctx);
    var bass = new Vex.Flow.Stave(10, 65, 80).addClef('bass').setContext(ctx);

    //console.log('darw', draw);
    //var svg = div.find('svg');
    //console.log('svg', svg);
    //svg.attr('viewBox', '0 0 100 100');

    function getNote(midi, note) {
        var staveNote = new Vex.Flow.StaveNote({
            clef: midi >= 60 ? 'treble' : 'bass',
            keys: [note],
            duration: "w"
        });
        if (note.indexOf('#') != -1) {
            staveNote.addAccidental(0, new Vex.Flow.Accidental("#"));
        } else if (note.indexOf('b') != -1) {
            staveNote.addAccidental(0, new Vex.Flow.Accidental("b"));
        }
        return staveNote;
    }

    this.autorun(function() {
        ctx.clearRect(0,0,700,300);
        var voice = new Vex.Flow.Voice({
            num_beats: 4,
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        });
        var note = Session.get('note') ? Session.get('note').toLowerCase() : 'c/4';
        // Add notes to voice

        if (Session.get('midi') >= 60) {

        }
        else {

        }

        voice.addTickables([getNote(Session.get('midi'), Session.get('note'))]);

        // Format and justify the notes to 500 pixels
        var formatter = new Vex.Flow.Formatter().
        joinVoices([voice]).format([voice], 100);

        treble.draw();
        bass.draw();
        if (Session.get('midi') >= 60) {
            voice.draw(ctx, treble);
        }
        else {
            voice.draw(ctx, bass);
        }
    });
}