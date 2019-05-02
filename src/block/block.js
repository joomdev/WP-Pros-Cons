//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const topIcons = {
	color: 'white',
	fontSize: 35,
	verticalAlign: 'middle',
	marginTop: 30,
};

registerBlockType( 'tc/block-prosandcons', {
	title: __( 'Pros And Cons' ),
	icon: 'schedule',
	category: 'common',
	keywords: [
		__( 'Pros And Cons' ),
		__( 'ThemesCamp' ),
		__( 'Pros&Cons' ),
	],

	attributes: {
		
	},

	edit: function( props ) {
		
		return (
			<div className="wp-pros-cons">
				<h3 className="wp-pros-cons-title">
					<h2>title here</h2>
				</h3>
				<div className="wp-pros-cons-sections">
					<div className="wp-pros-cons-col">
						<div className="pros-section section">
							<div className="wp-pros-cons-img-wrap">
								<div className="wp-pros-cons-img-container bg-green">
									<i style={topIcons} className="far fa-thumbs-up wpc-top-icons"></i>
								</div>
							</div>
							<div className="section-title">Pros</div>
							{/* Here comes all the pros */}
						</div>
					</div>
					<div className="wp-pros-cons-col">
						<div className="cons-section section">
							<div className="wp-pros-cons-img-wrap">
								<div className="wp-pros-cons-img-container bg-red">
									<i style={topIcons} className="far fa-thumbs-down wpc-top-icons"></i>
								</div>
							</div>
							<div className="section-title">Cons</div>
							{/* Here comes all the cons */}
							
						</div>
					</div>
				</div>

			</div>
		);
	},

	save: function( props ) {
		return (
			<div>
				<p>— Hello from the frontend.</p>
				<p>
					CGB BLOCK: <code>prosandcons</code> is a new Gutenberg block.
				</p>
				<p>
					It was created via{ ' ' }
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>.
				</p>
			</div>
		);
	},
} );
