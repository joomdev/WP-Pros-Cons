//  Import CSS.
import './style.scss';
import './editor.scss';
import { RawHTML } from '@wordpress/element';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Button } = wp.components;
const { RichText, PlainText } = wp.editor;
const { Fragment } = wp.element;

registerBlockType( 'tc/block-prosandcons', {
	title: __( 'Pros And Cons' ),
	icon: 'thumbs-up',
	category: 'common',
	keywords: [
		__( 'Pros And Cons' ),
		__( 'ThemesCamp' ),
		__( 'Pros&Cons' ),
	],

	attributes: {
		title: {
			source: 'text',
			selector: 'h3.wpc-title'
		},
		prosValues: {
			type: "string",
			source: "html",
			selector: "ol,ul",
			multiline: "li",
			default: ""
		},
		consValues: {
			type: "string",
			source: "html",
			selector: "ol,ul",
			multiline: "li",
			default: ""
		}
	},

	edit({attributes, setAttributes, onReplace, className}) {
		const { prosValues, consValues } = attributes;

		return (
			<div className="wp-pros-cons">
				<h3 className="wp-pros-cons-title">
					<RichText
						onChange={ content => setAttributes({ title: content }) }
						value={ attributes.title }
						placeholder="Title goes here.."
						className="heading"
					/>
				</h3>
				<div className="wp-pros-cons-sections">
					<div className="wp-pros-cons-col">
						<div className="pros-section section">
							<div className="wp-pros-cons-img-wrap">
								<div className="wp-pros-cons-img-container bg-green">
									<i className="far fa-thumbs-up wpc-top-icons"></i>
								</div>
							</div>
							<div className="section-title">Pros</div>
							{/* Here comes all the pros */}
							<ul class="wpc_pros_list">
								<RichText
									identifier="prosValues"
									multiline="li"
									onChange={ ( nextValues ) => setAttributes( { prosValues: nextValues } ) }
									value={ prosValues }
									wrapperClassName="wpc_pros_list"
									className="wpc_pro_single"
									placeholder={ __( 'Write list…' ) }
									onRemove={ () => onReplace( [] ) }
									placeholder="Pros goes here.."
								/>
							</ul>
							
						</div>
					</div>
					<div className="wp-pros-cons-col">
						<div className="cons-section section">
							<div className="wp-pros-cons-img-wrap">
								<div className="wp-pros-cons-img-container bg-red">
									<i className="far fa-thumbs-down wpc-top-icons"></i>
								</div>
							</div>
							<div className="section-title">Cons</div>
							{/* Here comes all the cons */}
							<ul class="wpc_cons_list">
								<RichText
									identifier="consValues"
									multiline="li"
									onChange={ ( nextValues ) => setAttributes( { consValues: nextValues } ) }
									value={ consValues }
									wrapperClassName="wpc_cons_list"
									className="wpc_con_single"
									onRemove={ () => onReplace( [] ) }
									placeholder="Cons goes here.."
								/>
							</ul>
						</div>
					</div>
				</div>

			</div>
		);
	},

	save({ attributes }) {
		return (
			<div className="wp-pros-cons">
				<h3 className="wp-pros-cons-title wpc-title">
					<RawHTML>{ attributes.title }</RawHTML>
				</h3>
				<div className="wp-pros-cons-sections">
					<div className="wp-pros-cons-col">
						<div className="pros-section section">
							<div className="wp-pros-cons-img-wrap">
								<div className="wp-pros-cons-img-container bg-green">
									<i className="far fa-thumbs-up wpc-top-icons"></i>
								</div>
							</div>
							<div className="section-title">Pros</div>
							{/* Here comes all the pros */}
							<ul class="wpc_pros_list">
								<li class="wpc_pro_single">Lorem</li>
								<li class="wpc_pro_single">Ipsum</li>
								<li class="wpc_pro_single">Dolor</li>
							</ul>
						</div>
					</div>
					<div className="wp-pros-cons-col">
						<div className="cons-section section">
							<div className="wp-pros-cons-img-wrap">
								<div className="wp-pros-cons-img-container bg-red">
									<i className="far fa-thumbs-down wpc-top-icons"></i>
								</div>
							</div>
							<div className="section-title">Cons</div>
							{/* Here comes all the cons */}
							<ul class="wpc_cons_list">
								<li class="wpc_con_single">Dolor</li>
								<li class="wpc_con_single">Ipsum</li>
								<li class="wpc_con_single">Lorem</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	},
} );
