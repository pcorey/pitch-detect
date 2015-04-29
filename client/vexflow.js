Template.vexflow.rendered = function() {
    var svg = $('svg')[0];
    var renderer = new Vex.Flow.Renderer(svg, Vex.Flow.Renderer.Backends.SVG);
    var ctx = renderer.getContext();
    var stave = new Vex.Flow.Stave(10, 0, 70).addClef('treble').setContext(ctx);

    //console.log('darw', draw);
    //var svg = div.find('svg');
    //console.log('svg', svg);
    //svg.attr('viewBox', '0 0 100 100');

    this.autorun(function() {
        ctx.clearRect(0,0,700,300);
        var voice = new Vex.Flow.Voice({
            num_beats: 4,
            beat_value: 4,
            resolution: Vex.Flow.RESOLUTION
        });
        var note = Session.get('note') ? Session.get('note').toLowerCase() : 'c/4';
        console.log('note', note);
        // Add notes to voice
        voice.addTickables([new Vex.Flow.StaveNote({ keys: [note], duration: "w" })]);

        // Format and justify the notes to 500 pixels
        var formatter = new Vex.Flow.Formatter().
        joinVoices([voice]).format([voice], 100);

        stave.draw();
        voice.draw(ctx, stave);
    });
}