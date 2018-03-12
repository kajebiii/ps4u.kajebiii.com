// Copyright (c) 2018- JongBeom Kim (https://ps.kajebiii.ga)

//lib_md = markdown;
function markdownWithMathjax(markdown, output, secret) {
	this.j_markdown = $("#"+markdown);
	this.j_output = $("#"+output);
	this.j_secret = $("#"+secret);
	this.e_secret = document.getElementById(secret);
	this.isEdited = false;
	this.isWaitMath = false;
	this.isPending = false;

	var me = this;

	Unescape = function(html) {
		return html
			.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>');
	}

	this.contentInit = function(init) {
		this.j_markdown.val(init);
		this.j_markdown.keyup();
	}
	
	this.settingInit = function() {
		
		var finish = function() {
			me.isWaitMath = me.isPending = false;
			var html = me.j_secret.html();
			//console.log(html);
			//console.log(marked(Unescape(html)));
			//me.j_output.html(lib_md.toHTML(html));
			me.j_output.html(marked(Unescape(html)));
			//$('#form_' + id + '_show').find('pre').each(function() {$(this).html(Unescape($(this).html()));});
		};
		
		var update = function() {
			//console.log("keyup");
			me.j_markdown.css("height", this.scrollHeight + 'px');
			if(me.isPending) return;
			me.isEdited = true;
			if(me.isWaitMath) {
				me.isPending = true;
				MathJax.Hub.Queue([update]);
			}else{
				me.e_secret.innerHTML = me.j_markdown.val();
				me.isWaitMath = true;
				MathJax.Hub.Queue(
						["Typeset", MathJax.Hub, me.e_secret],
						[finish]
				);
			}
		};
		(me.j_markdown).bind('keyup', update);

		(me.j_markdown).on('input', function () {
			//this.style.height = 'auto';
			//this.style.height = (this.scrollHeight) + 'px';
			//console.log("input");
			$(this).css("height", "auto");
			$(this).css("height", this.scrollHeight + 'px');
			//console.log($(this).prop('scrollHeight'));
			//$(this).height( $(this).prop('scrollHeight'));	
		});
		
		(me.j_markdown).keyup();
		//(me.j_markdown).input();

		//leave
		$(window).bind('beforeunload', function() {
			if (me.isEdited) {
				return 'Are you sure you want to leave? Your changes will be lost.';
			}
		});
	};
}
