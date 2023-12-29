import React from 'react';

const HelpDialog = () => {
    return (
        <div className="help-dialog">
            <div className='help-dialog-content'>
                <h1>Possible Actions</h1>
                <p>
                    Ready to unveil your New Year's resolutions? 
                    🌟 Use the simplicity of Markdown to share your goals and check out others' resolutions in real time for inspiration. 
                    Write your first resolution now! 🚀
                </p>
                <div className="action-grid">
                    <div>
                        <span className="material-symbols-outlined">
                            zoom_in
                        </span>
                        <p>Zoom in</p>
                    </div>
                    <div>
                        <span className="material-symbols-outlined">
                            zoom_out
                        </span>
                        <p>Zoom out</p>
                    </div>
                    <div>
                        <span className="material-symbols-outlined">
                            open_with
                        </span>
                        <p>Slide</p>
                    </div>
                    <div>
                        <span className="material-symbols-outlined">
                            add
                        </span>
                        <p>Create a Card</p>
                    </div>
                    <div>
                        <span className="material-symbols-outlined">
                            delete
                        </span>
                        <p>Delete a Card</p>
                    </div>
                    <div>
                        <span className="material-symbols-outlined">
                            update
                        </span>
                        <p>Update a Card</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HelpDialog;
