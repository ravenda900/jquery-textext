(function($)
{
	/**
	 * Prompt plugin displays a visual user propmpt in the text input area. If user focuses
	 * on the input, the propt is hidden and only shown again when user focuses on another
	 * element and text input doesn't have a value.
	 *
	 * @author agorbatchev
	 * @date 2011/08/18
	 * @id TextExtPrompt
	 */
	function TextExtPrompt() {};

	$.fn.textext.TextExtPrompt = TextExtPrompt;
	$.fn.textext.addPlugin('prompt', TextExtPrompt);

	var p = TextExtPrompt.prototype,

		CSS_HIDE_PROMPT = 'text-hide-prompt',

		/**
		 * Prompt plugin has options to change the prompt label and its HTML template. The options
		 * could be changed when passed to the `$().textext()` function. For example:
		 *
		 *     $('textarea').textext({
		 *         plugins: 'prompt',
		 *         prompt: 'Your email address'
		 *     })
		 *
		 * @author agorbatchev
		 * @date 2011/08/18
		 * @id TextExtPrompt.options
		 */

		/**
		 * Prompt message that is displayed to the user whenever there's no value in the input.
		 *
		 * @name prompt
		 * @default "Awaiting input..."
		 * @author agorbatchev
		 * @date 2011/08/18
		 * @id TextExtPrompt.options.prompt
		 */
		OPT_PROMPT = 'prompt',

		/**
		 * HTML source that is used to generate markup required for the prompt effect.
		 *
		 * @name html.prompt
		 * @default '<div class="text-prompt"/>'
		 * @author agorbatchev
		 * @date 2011/08/18
		 * @id TextExtPrompt.options.html.prompt
		 */
		OPT_HTML_PROMPT = 'html.prompt',

		/**
		 * Prompt plugin dispatches or reacts to the following events.
		 * @id TextExtPrompt.events
		 */

		/**
		 * Prompt plugin reacts to the `focus` event and hides the markup generated from
		 * the `html.prompt` option.
		 *
		 * @name focus
		 * @author agorbatchev
		 * @date 2011/08/18
		 * @id TextExtPrompt.events.focus
		 */

		/**
		 * Prompt plugin reacts to the `blur` event and shows the prompt back if user
		 * hasn't entered any value.
		 *
		 * @name blur
		 * @author agorbatchev
		 * @date 2011/08/18
		 * @id TextExtPrompt.events.blur
		 */
	
		DEFAULT_OPTS = {
			prompt : 'Awaiting input...',

			html : {
				prompt : '<div class="text-prompt"/>'
			}
		}
		;

	/**
	 * Initialization method called by the core during plugin instantiation.
	 *
	 * @signature TextExtPrompt.init(parent)
	 *
	 * @param parent {TextExt} Instance of the TextExt core class.
	 *
	 * @author agorbatchev
	 * @date 2011/08/18
	 * @id TextExtPrompt.init
	 */
	p.init = function(parent)
	{
		var self = this;

		self.baseInit(parent, DEFAULT_OPTS);
		
		self.core().getWrapContainer().append(self.opts(OPT_HTML_PROMPT));
		self.setPrompt(self.opts(OPT_PROMPT));
		
		self.on({
			blur  : self.onBlur,
			focus : self.onFocus
		});

		self._timeoutId = 0;
	};

	//--------------------------------------------------------------------------------
	// Event handlers
	
	/**
	 * Reacts to the `blur` event and shows the prompt effect with a slight delay which 
	 * allows quick refocusing without effect blinking in and out.
	 *
	 * @signature TextExtPrompt.onBlur(e)
	 *
	 * @param e {Object} jQuery event.
	 *
	 * @author agorbatchev
	 * @date 2011/08/08
	 * @id TextExtPrompt.onBlur
	 */
	p.onBlur = function(e)
	{
		var self = this;

		clearTimeout(self._timeoutId);

		if(self.input().val() == '' && self.core().hasData())
			self._timeoutId = setTimeout(function()
			{
				self.getPrompt().removeClass(CSS_HIDE_PROMPT);
			},
			100);
	};

	/**
	 * Reacts to the `focus` event and hides the prompt effect.
	 *
	 * @signature TextExtPrompt.onFocus
	 *
	 * @param e {Object} jQuery event.
	 * @author agorbatchev
	 * @date 2011/08/08
	 * @id TextExtPrompt.onFocus
	 */
	p.onFocus = function(e)
	{
		var self = this;

		clearTimeout(self._timeoutId);
		self.getPrompt().addClass(CSS_HIDE_PROMPT);
	};
	
	//--------------------------------------------------------------------------------
	// Core functionality

	/**
	 * Sets the prompt display to the specified string.
	 *
	 * @signature TextExtPrompt.setPrompt(str)
	 *
	 * @oaram str {String} String that will be displayed in the prompt.
	 *
	 * @author agorbatchev
	 * @date 2011/08/18
	 * @id TextExtPrompt.setPrompt
	 */
	p.setPrompt = function(str)
	{
		this.getPrompt().text(str);
	};

	/**
	 * Returns prompt effect HTML element.
	 *
	 * @signature TextExtPrompt.getPrompt()
	 *
	 * @author agorbatchev
	 * @date 2011/08/08
	 * @id TextExtPrompt.getPrompt
	 */
	p.getPrompt = function()
	{
		return this.core().getWrapContainer().find('.text-prompt');
	};
})(jQuery);
