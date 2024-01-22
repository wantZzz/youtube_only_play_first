// ==UserScript==
// @name         Youtube Only Play First_en
// @namespace    https://github.com/wantZzz
// @version      0.0.0
// @author       WannaZzz
// @match        https://www.youtube.com/
// @description  Add the option to play the first video alone in the playlist on the homepage
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAe1BMVEVHcEymAACFhYXkAAC/AADyAADTAAD/////Ly//AwPhBgbxAAAmAAD5AADxAADJAADVBATaDw+BAADTAgL/LCzWAADhCAjfGhr/KCjnAAD0AADOAAD/AAD/////9/f/7+//e3v/UFD/vr7/qan/PT3/39//kJD/Kir/zc0Q/tNHAAAAHHRSTlMALQOZg+HKD8j9S+wQ88ttWX4fO6+0imqYqbniBuNvagAAAZNJREFUWIXtlt1ygjAQhTdEaBOSQEQBNVGrrfX9n7ABRlvR/EhueuGZYRgg52MTluwCvPTSv1LCEKpo00jZtovF4n0sc69ta9k0Ja0QYsnIPpdrkeZEKdUdv6erhmvSn3ieCoHpXztWT4uotLz4Wfq8v1cz+FE+0a/UEMNqsl/l/QJM9w8hFDEAHDcDpQSDRMQA0jnMp37DXhxFAggFxG0P9+N0fqQSKuuw7TmAUEBpB2h99CJqRxoYgD5/eADYAzBBfDoBK5h5AHq3dwGWfoDWX455BAH09mgdlAUBHPMIBWh9eLyYGdSBgN3p4SARGoElgNAp2L9DGOD0bR0UAjjY7V0e+FLZnYhegEkh4vwjMZQugCuJLwBqfYEv+l4SKuuWdvC+XnU7UkRl7FTG7soVsKjCkiOAdUwApjKBjIlgbYprFQOQXYMQs4qsA9Dp/npokiYT6kubVk5LpqvfSIo8pBZfRbjA7KZVZYgWM7zMsk3O+V2f2nsI4TzdZNkSzwpa3drHfXOSvN3J3HR32y+9FKEfw10c+oXU9S4AAAAASUVORK5CYII=
// @run-at       document-idle
// @grant 		 GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
	var is_done = false;
	var first_link_url = null;

	function now_jump_package(){
		window.open(first_link_url);
	}

	function add_popup_rendere_event(){
		const ytd_menu_popup_renderer = document.querySelector('ytd-menu-popup-renderer');

		if(ytd_menu_popup_renderer && !is_done){
			try{
				ytd_menu_popup_renderer.addEventListener('yt-popup-opened', function() {
					function add_customization_menuitem() {
						const ytd_menu_popup_renderer_c = document.querySelector('ytd-menu-popup-renderer');
						const popup_renderer_listbox = ytd_menu_popup_renderer_c.querySelector('tp-yt-paper-listbox');
						const selected_grid_media = ytd_menu_popup_renderer_c.ytRendererBehavior.eventSink_.parentComponent;
						const list_child_count = popup_renderer_listbox.childElementCount;

						let video_block_title;
						try{
							video_block_title =  selected_grid_media.querySelector('a#avatar-link').title;// The value of the collection will be'undefined'
						}catch(e){
							// There will be an exception error when clicking short (short has a different structure)
							video_block_title = '------short------';
						}
						
						if(video_block_title == 'undefined'){
							const link_url = selected_grid_media.querySelector('a#thumbnail').href;
							first_link_url = link_url.split('&')[0];

							if(!popup_renderer_listbox.querySelector('ytd-menu-customization-item-renderer')){
								var menuitem_builder = document.createElement("div");

								menuitem_builder.innerHTML = '<ytd-menu-customization-item-renderer class="style-scope ytd-menu-popup-renderer"\
																use-icons="" system-icons="" role="menuitem" tabindex="-1" aria-selected="false">\
																	<tp-yt-paper-item class="style-scope ytd-menu-service-item-renderer" style-target="host"\
																	role="option" tabindex="0" aria-disabled="false">\
																		<yt-customization-icon class="style-scope ytd-menu-service-item-renderer">\
																			<yt-customization-icon-shape class="style-scope yt-icon">\
																				<icon-customization-shape class="yt-spec-icon-shape">\
																					<div style="width: 100%; height: 100%; fill: currentcolor;">\
																						<svg height="24" viewBox="0 0 24 24"\
																						width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;">\
																							<path d="M16 16h-5v-1h5zm0 -4h-7v-1h7zm-3 -4h-10v-1h10zm-3 7l-7 -4v8l7 -4zm8 4h3v-13h-1l-5 1v2h3z">\
																							</path>\
																						</svg>\
																					</div>\
																				</icon-customization-shape>\
																			</yt-customization-icon-shape>\
																		</yt-customization-icon>\
																		<yt-formatted-customization-string class="style-scope ytd-menu-service-item-renderer">\
																			Only play the first video\
																		</yt-formatted-customization-string>\
																		<ytd-badge-supported-renderer class="style-scope ytd-menu-service-item-renderer"\
																		disable-upgrade="" hidden="">\
																		</ytd-badge-supported-renderer>\
																	</tp-yt-paper-item>\
																</ytd-menu-service-item-renderer>';

								const menuitem_element = menuitem_builder.querySelector('ytd-menu-customization-item-renderer');

								document.querySelector('ytd-menu-popup-renderer').style.maxHeight = '';
								document.querySelector('ytd-menu-popup-renderer').style.maxWidth = '';

								popup_renderer_listbox.insertBefore(menuitem_element, popup_renderer_listbox.childNodes[0]);

								const menu_popup_renderer = ytd_menu_popup_renderer.parentNode.parentNode;

								menu_popup_renderer.style.left = Math.round(menu_popup_renderer.getBoundingClientRect().left - 50) + 'px';
								const customization_item_renderer = popup_renderer_listbox.querySelector('ytd-menu-customization-item-renderer');
								customization_item_renderer.addEventListener('click', now_jump_package);
							}else{
								const link_url = selected_grid_media.querySelector('a#thumbnail').href;
								first_link_url = link_url.split('&')[0];
							}

							return [popup_renderer_listbox, list_child_count];
						}

						return [popup_renderer_listbox, 999];
					}

					setTimeout(function () {
						var count = 0;
						var popup_renderer_listbox = null;

						[popup_renderer_listbox, count] = add_customization_menuitem();
						setTimeout(function () {
							if(popup_renderer_listbox.childElementCount < count+1){
								count = add_customization_menuitem();
							}
						}, 400);
					}, 400);
				});
				
				console.log('[YOPF]: Insert event successful!');
				is_done = true;
				document.body.removeEventListener("click", add_popup_rendere_event);
			}catch(e){
				console.log('[YOPF]: Inserting event failed with alert:'+ e.name);
				console.log(e.message);
			}
		}else{
			console.log('[YOPF]: Still waiting for the user to click on those three dots...');
		}
	}

	//By default, Youtube will not construct the pop-up option element first, but will wait until the user clicks on the pop-up option (it will detect whether the pop-up option exists every time there is a bubble click event)
	document.body.addEventListener('click', add_popup_rendere_event);
    console.log('[YOPF]: YOPF has been loaded and is waiting for the user to click on the three dots');

	GM_addStyle('ytd-menu-customization-item-renderer{\
					cursor: pointer;\
					display: flexbox;\
					display: flex;\
					flex-direction: column;\
				}');

	GM_addStyle('yt-formatted-customization-string{\
					color: var(--yt-spec-text-primary);\
					white-space: nowrap;\
					margin-right: 24px;\
					flex: 1;\
					flex-basis: 1e-9px;\
					font-family: "Roboto","Arial",sans-serif;\
					font-size: 1.4rem;\
					line-height: 2rem;\
					font-weight: 400;\
					user-select: none;\
				}');

	GM_addStyle('yt-customization-icon{\
					margin-right: 16px;\
					width: 24px;\
					height: 24px;\
					color: var(--yt-spec-icon-inactive);\
					display: var(--yt-menu-item-icon-display, inline-block);\
					flex: none;\
				}');
})();